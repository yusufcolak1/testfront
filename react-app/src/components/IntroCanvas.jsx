import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import gsap from 'gsap';

export default function IntroCanvas({ onComplete }) {
    const containerRef = useRef(null);
    const animationActiveRef = useRef(true);
    const frameIdRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // === ÇÖZÜM ===
        // React 18 Strict Mode'da component iki kere mount/unmount olur. 
        // useRef önceki unmount'tan "false" değerini sakladığı için animasyon HİÇ başlamıyordu.
        // Bu yüzden her aktif useEffect başında bu bayrağı mutlaka "true" yapmalıyız!
        animationActiveRef.current = true;

        const canvasContainer = containerRef.current;

        let currentActiveModel = null;
        let rotState = { speed: 0 };

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(4, 3, 6);

        const renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(1.25); // 1.5'ten 1.25'e çekildi, performans için ideal denge.
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.6;

        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

        canvasContainer.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = false;
        controls.enablePan = false;
        controls.enableZoom = false;

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        const fillLight = new THREE.PointLight(0xffffff, 1.0);
        fillLight.position.set(-5, 2, -5);
        scene.add(fillLight);

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/gltf/');
        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

        const modelsData = [
            { file: '/bilgisayar.glb', name: 'bilgisayar', targetSize: 3.0 },
            { file: '/mercedes.glb', name: 'mercedes', targetSize: 4.5 }
        ];

        const loadedModels = [];
        const transitionUniforms = {
            uTime: { value: 0 },
            uTwirl: { value: 0 },
            uOpacity: { value: 1 },
            uGlowColor: { value: new THREE.Color(0x00ffff) }
        };

        const applyPortalShader = (material, isModelB) => {
            if (Array.isArray(material)) {
                material.forEach(m => applyPortalShader(m, isModelB));
                return;
            }
            material.transparent = true;
            material.side = THREE.FrontSide;
            material.customProgramCacheKey = () => isModelB ? 'portal_B' : 'portal_A';

            material.onBeforeCompile = (shader) => {
                shader.uniforms.uTime = transitionUniforms.uTime;
                shader.uniforms.uTwirl = transitionUniforms.uTwirl;
                shader.uniforms.uOpacity = transitionUniforms.uOpacity;
                shader.uniforms.uGlowColor = transitionUniforms.uGlowColor;

                shader.vertexShader = `
                    uniform float uTwirl;
                    varying vec3 vPortalPos;
                ` + shader.vertexShader;

                shader.vertexShader = shader.vertexShader.replace(
                    '#include <begin_vertex>',
                    `
                    #include <begin_vertex>
                    float angle = length(transformed.xz) * uTwirl;
                    float s = sin(angle);
                    float c = cos(angle);
                    mat2 m = mat2(c, -s, s, c);
                    transformed.xz = m * transformed.xz;
                    transformed.y += sin(uTwirl * 0.5 + transformed.y) * abs(uTwirl) * 0.1;
                    vPortalPos = transformed;
                    `
                );

                shader.fragmentShader = `
                    uniform float uOpacity;
                    uniform vec3 uGlowColor;
                    varying vec3 vPortalPos;
                ` + shader.fragmentShader;

                shader.fragmentShader = shader.fragmentShader.replace(
                    '#include <output_fragment>',
                    `
                    #include <output_fragment>
                    gl_FragColor.a *= uOpacity;
                    float glow = pow(abs(uOpacity - 0.5) * 2.0, 2.0);
                    gl_FragColor.rgb = mix(gl_FragColor.rgb, uGlowColor, (1.0 - glow) * 0.5);
                    `
                );
            };
        };

        const setupModelMaterials = (model) => {
            model.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.userData.originalMaterial = child.material;
                    applyPortalShader(child.material, false);
                }
            });
        };

        const startCinematicEngine = async () => {
            try {
                const gltfPromises = modelsData.map(data => gltfLoader.loadAsync(data.file));
                const gltfs = await Promise.all(gltfPromises);

                for (let i = 0; i < gltfs.length; i++) {
                    if (!animationActiveRef.current) return;

                    const model = gltfs[i].scene;
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);

                    const wrapper = new THREE.Group();
                    model.position.set(-center.x, -center.y, -center.z);
                    wrapper.add(model);

                    const targetScale = (modelsData[i].targetSize || 3.8) / maxDim;
                    wrapper.scale.setScalar(targetScale);
                    wrapper.userData.targetScale = targetScale;
                    setupModelMaterials(model);
                    scene.add(wrapper);
                    loadedModels[i] = wrapper;

                    wrapper.visible = true;
                    wrapper.scale.setScalar(0.001);
                    renderer.render(scene, camera);
                    wrapper.visible = false;
                }
            } catch (e) {
                console.error("Model load error", e);
            }

            // GPU'yu hazırla (Kasma sorununu önlemek için modelleri önceden derle)
            renderer.compile(scene, camera);
            await new Promise(r => setTimeout(r, 200));

            if (loadedModels.length < 2 || !animationActiveRef.current) return;

            const tl = gsap.timeline();
            tl.to({}, { duration: 0.3 }); // GPU upload biterken ufak bir nefes payı

            loadedModels.forEach((m, idx) => {
                const tScale = m.userData.targetScale || 1.0;
                m.visible = (idx === 0);
                m.scale.setScalar(idx === 0 ? tScale : 0.01 * tScale);
            });

            transitionUniforms.uOpacity.value = 1;
            transitionUniforms.uTwirl.value = 0;
            currentActiveModel = loadedModels[0];
            rotState.speed = 0.02;

            const createJump = (idxA, idxB) => {
                const modelA = loadedModels[idxA];
                const modelB = loadedModels[idxB];
                const sA = modelA.userData.targetScale || 1.0;
                const sB = modelB.userData.targetScale || 1.0;

                tl.to(rotState, { speed: 0.8, duration: 0.8, ease: "power2.in" });
                tl.to(modelA.scale, { x: 0.1 * sA, y: 0.1 * sA, z: 0.1 * sA, duration: 0.8, ease: "power2.in" }, "<");
                tl.to(transitionUniforms.uTwirl, { value: 6.0, duration: 0.8, ease: "power2.in" }, "<");
                tl.to(transitionUniforms.uOpacity, { value: 0, duration: 0.3 }, "-=0.3");

                tl.call(() => {
                    modelA.visible = false;
                    modelB.visible = true;
                    currentActiveModel = modelB;
                    transitionUniforms.uTwirl.value = -6.0;
                    transitionUniforms.uOpacity.value = 0;
                    modelB.scale.setScalar(0.1 * sB);
                });

                tl.to(transitionUniforms.uOpacity, { value: 1, duration: 0.3 });
                tl.to(rotState, { speed: 0.02, duration: 0.8, ease: "power2.out" }, "<");
                tl.to(modelB.scale, { x: sB, y: sB, z: sB, duration: 0.8, ease: "power2.out" }, "<");
                tl.to(transitionUniforms.uTwirl, { value: 0, duration: 0.8, ease: "power2.out" }, "<");
                tl.to({}, { duration: 0.4 });
            };

            // Telefon kalktı, doğrudan Bilgisayar -> Araba geçişi yapıyoruz
            createJump(0, 1);

            const car = loadedModels[1];

            tl.call(() => { currentActiveModel = null; });
            tl.to(car.rotation, { y: Math.PI * 0.5, duration: 0.6, ease: "power2.out" });
            tl.to({}, { duration: 0.1 });

            tl.call(() => {
                const uiLive = document.getElementById('ui-container');
                if (uiLive) {
                    // Satır 1: Başlangıç - görünmez, clip ile sadece slogan alanı (500px) hazırda
                    gsap.set(uiLive, {
                        top: '0',
                        y: '15vh',
                        opacity: 0,
                        clipPath: 'inset(0 0 calc(100% - 500px) 0)',
                        pointerEvents: 'none',
                        force3D: true
                    });
                    uiLive.classList.remove('opacity-0');
                }
            });

            // Araba harekete geçmeye başlar: sadece slogan görünsün
            tl.call(() => {
                const uiLive = document.getElementById('ui-container');
                if (!uiLive) return;

                // Container'a aniden görünürlük ver ki içerideki her şeyi tek tek yönetebilelim
                gsap.set(uiLive, { clipPath: 'none' });
                gsap.to(uiLive, { opacity: 1, duration: 0.1, force3D: true });

                // Slogan (h2) hariç her şeyi gizle
                const header = uiLive.querySelector('header');
                const heroRight = document.getElementById('hero-right');
                const heroRecommended = document.getElementById('hero-recommended');
                const heroSubContent = uiLive.querySelectorAll('main > div > section:not(:first-child), main > div > div, main > section:not(:first-child)');
                const searchBar = uiLive.querySelector('.pt-8');
                const subtitle = uiLive.querySelector('p.text-xl');

                if (header) gsap.set(header, { opacity: 0 });
                if (heroRight) gsap.set(heroRight, { opacity: 0 });
                if (heroRecommended) gsap.set(heroRecommended, { opacity: 0 });
                if (searchBar) gsap.set(searchBar, { opacity: 0 });
                if (subtitle) gsap.set(subtitle, { opacity: 0 });
                heroSubContent.forEach(el => gsap.set(el, { opacity: 0 }));

                // Sloganın soldan sağa açılması (Zarif Reveal Efekti)
                const slogan = uiLive.querySelector('#ui-static-slogan');
                if (slogan) {
                    // Önce sloganı görünür yap ama clip ile tamamen sakla
                    gsap.set(slogan, {
                        clipPath: 'inset(0 100% 0 0)',
                        opacity: 1,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                    });

                    // Soldan sağa perde açılır gibi...
                    gsap.to(slogan, {
                        clipPath: 'inset(0 0% 0 0)',
                        duration: 1.6,
                        ease: 'expo.out', // Daha akıcı bir duruş
                        delay: 0.2 // Diğer gizlemeler tamamlansın diye hafif bir nefes
                    });
                }

                // 1.5s sonra her şeyi göster
                const revealAll = () => {
                    if (header) gsap.to(header, { opacity: 1, duration: 0.6, ease: 'power2.out' });
                    if (heroRight) gsap.to(heroRight, { opacity: 1, duration: 0.6, ease: 'power2.out' });
                    if (heroRecommended) gsap.to(heroRecommended, { opacity: 1, duration: 0.6, ease: 'power2.out' });
                    if (searchBar) gsap.to(searchBar, { opacity: 1, duration: 0.6, ease: 'power2.out' });
                    if (subtitle) gsap.to(subtitle, { opacity: 1, duration: 0.6, ease: 'power2.out' });
                    heroSubContent.forEach(el => gsap.to(el, { opacity: 1, duration: 0.6, ease: 'power2.out' }));
                };
                setTimeout(revealAll, 1500);
            });
            tl.to(car.position, { x: 8, z: -3, duration: 1.0, ease: "power2.in" }, "<");
            tl.to(car.rotation, { y: Math.PI * 0.6, duration: 1.0, ease: "power2.in" }, "<");


            tl.to({}, { duration: 0.8 });



            tl.call(() => {
                const uiLive = document.getElementById('ui-container');
                if (!uiLive) return;

                uiLive.style.willChange = 'transform, opacity';

                gsap.to(uiLive, {
                    y: 0,
                    duration: 1.8,
                    ease: "power2.inOut",
                    force3D: true,
                    onComplete: () => {
                        uiLive.classList.remove('top-[15vh]', 'fixed', 'overflow-hidden', 'opacity-0');

                        gsap.set([uiLive, uiLive.querySelector('#ui-static-slogan'), uiLive.querySelector('header')], { clearProps: 'all' });
                        uiLive.style.position = 'relative';
                        uiLive.style.pointerEvents = 'auto';
                        uiLive.style.zIndex = '10';

                        if (canvasContainer) {
                            canvasContainer.style.pointerEvents = 'none';
                            canvasContainer.style.zIndex = '0'; // Araba gitti, arkaya çek
                        }

                        // Animasyonun bittiğini ana uygulamaya bildir
                        if (onComplete) onComplete();
                    }
                });
            });

            tl.to(car.position, { x: 20, z: 4, duration: 1.2, ease: "none" });
            tl.to(car.rotation, { y: Math.PI * 0.35, duration: 1.2, ease: "power1.inOut" }, "<");

            tl.to(car.position, { x: 50, z: -15, duration: 1.0, ease: "power2.in" });
            tl.to(car.rotation, { y: Math.PI * 0.55, duration: 1.0, ease: "power2.in" }, "<");
            tl.to(car.scale, { x: 0, y: 0, z: 0, duration: 1.0, ease: "power2.in" }, "<");

            tl.call(() => {
                car.visible = false;
                // ÖNEMLİ: Araba gittiği anda Three.js döngüsünü DURDURUYORUZ. 
                // UI kayarken arkada WebGL render olması kasmanın en büyük sebebidir.
                animationActiveRef.current = false;
            });

            tl.to(camera.position, {
                x: 5, y: 4, z: 8,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                    // Mikro-kasmayı önlemek için ağır temizlik işlemini 2 saniye sonraya (sayfa durulduğunda) erteliyoruz.
                    setTimeout(() => {
                        animationActiveRef.current = false;
                        cancelAnimationFrame(frameIdRef.current);

                        scene.traverse((object) => {
                            if (object.isMesh) {
                                if (object.geometry) object.geometry.dispose();
                                if (object.material) {
                                    Array.isArray(object.material) ? object.material.forEach(m => m.dispose()) : object.material.dispose();
                                }
                            }
                        });
                        renderer.dispose();
                        pmremGenerator.dispose();
                        controls.dispose();
                        dracoLoader.dispose();

                        if (canvasContainer && canvasContainer.contains(renderer.domElement)) {
                            canvasContainer.removeChild(renderer.domElement);
                        }
                    }, 2000);
                }
            }, "-=1.0");
        };

        startCinematicEngine();

        const clock = new THREE.Clock();
        const animate = () => {
            if (!animationActiveRef.current) return;
            frameIdRef.current = requestAnimationFrame(animate);
            let delta = clock.getDelta();
            if (delta > 0.1) delta = 0.016;
            if (currentActiveModel) currentActiveModel.rotation.y += (rotState.speed || 0.02) * (delta * 60);
            controls.update();
            transitionUniforms.uTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            animationActiveRef.current = false;
            cancelAnimationFrame(frameIdRef.current);
            renderer.dispose();

            // Eğer useEffect iptal edilirse, çakışmayı önlemek için eklenen canvas DOM'dan sökülür.
            if (canvasContainer && canvasContainer.contains(renderer.domElement)) {
                canvasContainer.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={containerRef} id="canvas-container" className="fixed inset-0 z-20 pointer-events-none" />;
}

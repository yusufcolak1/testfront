import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// --- Scene Setup ---
const scene = new THREE.Scene();
let currentActiveModel = null;
let rotState = { speed: 0 };

// PERFORMANS MOTORU ONAYLAYICI
let isAnimationActive = true;
let animationFrameId;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(4, 3, 6);

const renderer = new THREE.WebGLRenderer({ 
    antialias: false, 
    alpha: true,
    powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(1.2);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.6;

// Restore PMREM for high-quality reflections
const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
const canvasContainer = document.getElementById('canvas-container');
(canvasContainer || document.body).appendChild(renderer.domElement);
// Animasyon süresince canvas etkileşim alabilsin (OrbitControls için)
if (canvasContainer) canvasContainer.style.pointerEvents = 'auto';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = false;
controls.enablePan = false;
controls.enableZoom = false;

// --- Lights ---
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); 
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Additional light to compensate for environment removal
const fillLight = new THREE.PointLight(0xffffff, 1.0);
fillLight.position.set(-5, 2, -5);
scene.add(fillLight);

// --- Models & Loaders ---
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/gltf/');
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const modelsData = [
    { file: 'telefon.glb', name: 'telefon', targetSize: 2.5 },
    { file: 'bilgisayar.glb', name: 'bilgisayar', targetSize: 3.0 },
    { file: 'mercedes.glb', name: 'mercedes', targetSize: 4.5 }
];

const loadedModels = [];
const transitionUniforms = {
    uTime: { value: 0 },
    uTwirl: { value: 0 },
    uOpacity: { value: 1 },
    uGlowColor: { value: new THREE.Color(0x00ffff) }
};

// --- Core Functions ---
function setupModelMaterials(model) {
    model.traverse((child) => {
        if (child.isMesh) {
            if (child.material) {
                child.userData.originalMaterial = child.material;
                // Pre-apply portal shader to all materials once
                applyPortalShader(child.material, false);
            }
        }
    });
}

function applyPortalShader(material, isModelB) {
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
}

function processTransition(modelA, modelB) {
    // No cloning needed anymore, just toggle visibility
    modelA.visible = true;
    modelB.visible = true;
}

function finalizeModel(model) {
    // We keep the shader but set uTwirl to 0 and uOpacity to 1
    // This is more performant than swapping materials back and forth
}

async function loadAllModels() {
    console.log("Loading models...");
    for (let i = 0; i < modelsData.length; i++) {
        try {
            const gltf = await gltfLoader.loadAsync(modelsData[i].file);
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            
            const wrapper = new THREE.Group();
            model.position.set(-center.x, -center.y, -center.z);
            wrapper.add(model);
            
            const targetSize = modelsData[i].targetSize || 3.8;
            const targetScale = targetSize / maxDim;
            wrapper.scale.setScalar(targetScale);
            wrapper.userData.targetScale = targetScale;
            wrapper.updateMatrixWorld(true);
            
            setupModelMaterials(model);
            scene.add(wrapper);
            loadedModels[i] = wrapper;

            // Shader Pre-warming: Trigger compilation by rendering once
            wrapper.visible = true;
            wrapper.scale.setScalar(0.001);
            renderer.render(scene, camera);
            wrapper.visible = false;
        } catch (e) {
            console.error(`Error loading model ${i}:`, e);
        }
    }
}

async function startCinematicEngine() {
    await loadAllModels();
    if (loadedModels.length < 3 || typeof gsap === 'undefined') return;

    // Settle Delay: Allow browser to finish background tasks (Draco decoding, GC, etc)
    await new Promise(resolve => setTimeout(resolve, 500));

    const tl = gsap.timeline({
        onComplete: () => {
             // UI reveal moved to car drive-off sequence
        }
    });

    loadedModels.forEach((m, idx) => { 
        const tScale = m.userData.targetScale || 1.0;
        m.visible = (idx === 0); 
        m.scale.setScalar(idx === 0 ? tScale : 0.01 * tScale); 
        if (idx === 0) finalizeModel(m);
    });

    transitionUniforms.uOpacity.value = 1;
    transitionUniforms.uTwirl.value = 0;

    currentActiveModel = loadedModels[0];
    rotState = { speed: 0.02 };

    const createJump = (idxA, idxB) => {
        const modelA = loadedModels[idxA];
        const modelB = loadedModels[idxB];
        const sA = modelA.userData.targetScale || 1.0;
        const sB = modelB.userData.targetScale || 1.0;

        // Daha keskin ve hızlı geçiş (1.5 -> 0.8 saniye)
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
        tl.to({}, { duration: 0.4 }); // Etkiyi görmek için saliseler yetecek
    };

    // İlk başlangıçtaki bekleme süresi 2.0 saniyeden hemen geçişe (0.5 saniye) düşürüldü
    tl.to({}, { duration: 0.5 });

    createJump(0, 1);
    // Final Jump: Billboard (Mercedes)
    createJump(1, 2);

    // --- Mercedes Drive-Off Final Act ---
    const car = loadedModels[2];
    
    // Function to create dust particles at car position (PERFORMANS İYİLEŞTİRİLMİŞTİR)
    const spawnDust = (count = 15) => {
        for(let i=0; i<count; i++) {
            const dust = document.createElement('div');
            dust.className = 'dust-particle';
            const size = 10 + Math.random() * 40;
            dust.style.width = `${size}px`;
            dust.style.height = `${size}px`;
            dust.style.left = `${window.innerWidth/2 + (Math.random()-0.5)*200}px`;
            dust.style.top = `${window.innerHeight/2 + (Math.random()-0.5)*100}px`;
            
            // PERFORMANS: Havada uçuşan DOM partiküllerine donanım hızlandırması (GPU) veriyoruz.
            dust.style.willChange = 'transform, opacity'; 
            
            document.body.appendChild(dust);
            
            gsap.to(dust, {
                x: (Math.random()-0.5) * 400,
                y: (Math.random()-0.5) * 200 - 100,
                opacity: 0,
                scale: 2,
                duration: 1.5 + Math.random(),
                force3D: true, // GPU ile akıcı animasyon
                onComplete: () => dust.remove()
            });
        }
    };

    // Stop the auto-rotation loop first
    tl.call(() => {
        currentActiveModel = null;
    });

    // Phase 1: Burnunu sağa hazırla (Hızlı reaksiyon)
    tl.to(car.rotation, { y: Math.PI * 0.5, duration: 0.6, ease: "power2.out" });
    tl.to({}, { duration: 0.1 }); // Çok Kısa bekleyip fırla

    // Phase 2: Realistic S-Curve Drive-Off
    const ui = document.getElementById('ui-container');
    const staticSlogan = document.getElementById('ui-static-slogan');

    // Setup UI before drive-off starts
    tl.call(() => {
        if (ui) {
            // KASMAYI ÖNLEMEK İÇİN ANİMASYON "top" YERİNE "y" (TRANSFORM) İLE YAPILDI!
            gsap.set(ui, { 
                top: '0',     // UI'ın GERÇEK yeri sayfanın tam tavanı
                y: '25vh',    // Başlangıç noktasını "çoook hafif yukarı" aldım (30vh -> 25vh)
                opacity: 1, 
                pointerEvents: 'none',
                force3D: true,                   // PERFORMANS (GPU ZORLAMA): Kaymanın kasmaması/titrememesi için 3D transform açılır
                willChange: 'transform, opacity' // PERFORMANS (KOMPOZİTLEME): Tarayıcı UI'ı off-screen bir RAM tablosuna çeker ve sadece resim gibi kaydırır, asla kasmaz!
            });
            ui.classList.remove('opacity-0', 'translate-y-12');
            
            // 2. Hide everything initially, we will stagger fade them nicely from bottom by 30px
            const toHide = ui.querySelectorAll('header, main > *, section');
            gsap.set(toHide, { opacity: 0, y: 30 });
            
            if (staticSlogan) {
                const sloganContainer = staticSlogan.parentElement;
                gsap.set(sloganContainer, { opacity: 1, y: 0 }); 
                const sloganSiblings = Array.from(sloganContainer.children).filter(c => c !== staticSlogan);
                gsap.set(sloganSiblings, { opacity: 0, y: 30 });
                // Hide slogan with clip-path for left-to-right writing effect
                gsap.set(staticSlogan, { 
                    opacity: 0, 
                    clipPath: 'inset(0 100% 0 0)', 
                    webkitClipPath: 'inset(0 100% 0 0)',
                    y: 0
                });
            }
        }
    });

    // 1. Arabanın yola hızla çıkışı ve Sloganın seri yazılışı
    tl.call(() => spawnDust(20));
    tl.to(car.position, { x: 8, z: -3, duration: 1.0, ease: "power2.in" });
    tl.to(car.rotation, { y: Math.PI * 0.6, duration: 1.0, ease: "power2.in" }, "<");
    
    // Slogan writing effect
    if (staticSlogan) {
        tl.to(staticSlogan, { 
            opacity: 1, 
            clipPath: 'inset(0 0% 0 0)', 
            webkitClipPath: 'inset(0 0% 0 0)',
            duration: 1.2, 
            ease: "power1.inOut" 
        }, "<");
    }

    // 2. Çok bekletmeden (2.5 yerine 0.8 sn) arayüz menüleri belirsin
    tl.to({}, { duration: 0.8 }); 
    
    tl.call(() => {
        const otherContent = ui.querySelectorAll('header, main > div:not(.text-center), section, main > p, .text-center > *:not(#ui-static-slogan)');
        gsap.to(otherContent, { 
            opacity: 1, 
            y: 0,   // Seri yerine oturtma
            duration: 0.8, 
            stagger: 0.05,
            ease: "power2.out" 
        });
    });

    // 3. UI, başladığı o minik 25vh'lik mesafeyi kasmadan 1.8 sanike gibi hızlı ve enerjik sürede atsın.
    tl.to(ui, { 
        y: 0, 
        duration: 1.8, 
        ease: "power2.inOut", 
        force3D: true,
        // ANINDA ERİŞİM: Arayüz yukarı çıktığı salisede sayfayı scroll edilebilir hale getirir! (Geç gelme engellendi)
        onComplete: () => {
            if (ui) {
                gsap.set(ui, { clearProps: 'transform,top,y,willChange' });
                ui.style.position = 'fixed';
                ui.style.top = '0';
                ui.style.left = '0';
                ui.style.width = '100%';
                ui.style.height = '100%';
                ui.style.overflowY = 'auto'; // SCROLL BAR ANINDA AÇILIR
                ui.style.overflowX = 'hidden';
                ui.style.opacity = '1';
                ui.style.pointerEvents = 'auto';
                ui.style.zIndex = '10';
            }
            if (canvasContainer) {
                canvasContainer.style.pointerEvents = 'none';
            }
        }
    });

    // 2. Arabanın sert U dönüşü yapıp hızla basıp gitmesi (S-curve) (Çileden çıkartmayacak kadar hızlı)
    tl.call(() => spawnDust(15));
    tl.to(car.position, { x: 20, z: 4, duration: 1.2, ease: "none" });
    tl.to(car.rotation, { y: Math.PI * 0.35, duration: 1.2, ease: "power1.inOut" }, "<");
    
    // 3. Ufka ivmelenme ve kayboluş (Speed up)
    tl.call(() => spawnDust(30), "-=0.5");
    tl.to(car.position, { x: 50, z: -15, duration: 1.0, ease: "power2.in" });
    tl.to(car.rotation, { y: Math.PI * 0.55, duration: 1.0, ease: "power2.in" }, "<");
    tl.to(car.scale, { x: 0, y: 0, z: 0, duration: 1.0, ease: "power2.in" }, "<");

    tl.call(() => {
        car.visible = false;
    });

    // --- Scroll Bar (Y-Axis) aktivasyon kodları yukarıya onComplete olarak taşındı ---

    // Final camera cleanup süresi daha dinamik (VE FİNAL PERFORMANS TEMİZLİĞİ)
    tl.to(camera.position, { 
        x: 5, y: 4, z: 8, 
        duration: 1.5, 
        ease: "power2.inOut",
        onComplete: () => {
            // ==========================================================
            // ŞOV BİTTİ. ARTIK BİLGİSAYARI/SİTEYİ YORAMAZ! (MEMORY WIPE)
            // ==========================================================
            isAnimationActive = false; // Render (Çizim) Loop'u anında durdurulur
            cancelAnimationFrame(animationFrameId);
            
            // 3D Motorundaki Tüm Materyalleri ve Modelleri RAM'den tamamen sil (Garbage Collector'a ver)
            scene.traverse((object) => {
                if (object.isMesh) {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(mat => mat.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                }
            });
            renderer.dispose();
            pmremGenerator.dispose();
            controls.dispose();
            dracoLoader.dispose();
            
            // WebGL Canvas'ı HTML (DOM) yapısından kökünden söküp atılır
            const containerNode = document.getElementById('canvas-container');
            if (containerNode) {
                containerNode.remove();
            }
            
            console.log("3D Engine tamamen imha edildi. Temiz HTML/CSS Siteye bırakıldı.");
        }
    }, "-=1.0");
}

startCinematicEngine();

const clock = new THREE.Clock();
function animate() {
    // Animasyon aktif değilse saniyede 60 kere çalışan bu canavarı durdur!
    if (!isAnimationActive) return;
    
    animationFrameId = requestAnimationFrame(animate);
    
    let delta = clock.getDelta();
    // Cap delta at start to prevent initial lag spikes
    if (delta > 0.1) delta = 0.016; 
    
    const et = clock.getElapsedTime();
    
    // Unified animation logic: Use delta for frame-independent smoothness
    if (currentActiveModel) {
        currentActiveModel.rotation.y += (rotState.speed || 0.02) * (delta * 60);
    }
    
    controls.update();
    transitionUniforms.uTime.value = et;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

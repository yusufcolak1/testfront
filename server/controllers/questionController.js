const { prisma } = require('../config/database');

/**
 * İlana soru sor
 */
exports.askQuestion = async (req, res) => {
  try {
    const { itemId, question } = req.body;
    const userId = req.user.id;

    if (!question) {
      return res.status(400).json({ success: false, message: 'Soru metni boş olamaz.' });
    }

    const newQuestion = await prisma.itemQuestion.create({
      data: {
        itemId,
        userId,
        question
      }
    });

    res.status(201).json({ success: true, data: newQuestion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * İlanın sorularını getir
 */
exports.getItemQuestions = async (req, res) => {
  try {
    const { itemId } = req.params;

    const questions = await prisma.itemQuestion.findMany({
      where: { itemId },
      include: {
        user: {
          select: {
            profile: {
              select: { firstName: true, lastName: true, avatarUrl: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Soruya cevap ver (Sadece ilan sahibi)
 */
exports.answerQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { answer } = req.body;
    const userId = req.user.id;

    const question = await prisma.itemQuestion.findUnique({
      where: { id: questionId },
      include: { item: true }
    });

    if (!question) {
      return res.status(404).json({ success: false, message: 'Soru bulunamadı.' });
    }

    // İlan sahibi mi kontrol et
    if (question.item.userId !== userId) {
      return res.status(403).json({ success: false, message: 'Sadece ilan sahibi cevap verebilir.' });
    }

    const updatedQuestion = await prisma.itemQuestion.update({
      where: { id: questionId },
      data: { answer }
    });

    res.json({ success: true, data: updatedQuestion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

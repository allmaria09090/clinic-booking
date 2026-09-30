export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { firstName, lastName, phone, sessionType } = req.body;
    
    // سحب التوكن والـ ID من إعدادات Vercel المشفرة
    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const sessionText = sessionType === "online" ? "أونلاين" : "حضوري";
    const msg = `🔔 طلب حجز جديد!\n👤 الاسم: ${firstName} ${lastName}\n📱 الهاتف: ${phone}\n🗓 الجلسة: ${sessionText}\n\n🔗 للمعاينة، ادخل للوحة التحكم:\nhttps://dr-maria-labadi.vercel.app/admin.html`;
    
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}`;

    try {
        await fetch(url);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
}

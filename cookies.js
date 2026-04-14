export default function handler(req, res) {
  if (req.method === 'POST') {
    const { cookies } = req.body;
    
    // Procesar las cookies recibidas
    console.log('Cookies recibidas:', cookies);
    
    // Guardarlas en una base de datos o procesarlas según necesites
    
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}

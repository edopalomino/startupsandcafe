# Startups & Cafe 🚀☕

Una plataforma web de podcast generado por IA que presenta conversaciones inspiradoras sobre emprendimiento acompañadas de un buen café.

## 📖 Descripción

Startups & Cafe es una aplicación web moderna que presenta **podcasts completamente generados por IA** sobre emprendimiento y startups. Cada episodio es creado automáticamente utilizando inteligencia artificial, ofreciendo conversaciones únicas e inspiradoras. La plataforma cuenta con un reproductor de audio integrado, funcionalidad de búsqueda y una interfaz elegante y responsive.

## ✨ Características

- 🎧 **Reproductor de audio integrado** con controles completos
- 🔍 **Búsqueda en tiempo real** de episodios
- 📱 **Diseño responsive** para todos los dispositivos
- 🎨 **Interfaz moderna** y fácil de usar
- ⏯️ **Controles de reproducción** (play, pause, siguiente, anterior)
- 🔊 **Control de volumen** ajustable
- 📊 **Barra de progreso** interactiva
- 🤖 **Podcasts 100% generados por IA** - Contenido único y automatizado
- 💬 **Conversaciones sintéticas** realistas sobre emprendimiento

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y responsive
- **JavaScript (Vanilla)** - Funcionalidad interactiva
- **JSON** - Almacenamiento de datos de episodios
- **IA Generativa** - Creación automática de contenido de podcast

## 📁 Estructura del Proyecto

```
startupsandcafe/
├── index.html          # Página principal
├── style.css           # Estilos de la aplicación
├── main.js             # Lógica de la aplicación
├── podcasts.json       # Base de datos de episodios
└── README.md           # Documentación del proyecto
```

## 🚀 Instalación y Uso

1. **Clona el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd startupsandcafe
   ```

2. **Abre la aplicación**
   
   Puedes abrir el archivo `index.html` directamente en tu navegador web, o usar un servidor local:

   **Opción 1: Directamente en el navegador**
   ```bash
   open index.html
   ```

   **Opción 2: Servidor local con Python**
   ```bash
   python -m http.server 8000
   # Luego visita http://localhost:8000
   ```

   **Opción 3: Live Server (VS Code)**
   - Instala la extensión "Live Server" en VS Code
   - Click derecho en `index.html` → "Open with Live Server"

## 📱 Uso de la Aplicación

1. **Navegar episodios**: Los episodios se cargan automáticamente al abrir la aplicación
2. **Buscar**: Usa la barra de búsqueda para encontrar episodios específicos
3. **Reproducir**: Haz click en cualquier episodio para comenzar la reproducción
4. **Controles**: Usa los botones del reproductor para controlar la reproducción
5. **Volumen**: Ajusta el volumen con el control deslizante

## 🎨 Personalización

### Modificar episodios
Edita el archivo `podcasts.json` para añadir, modificar o eliminar episodios:

```json
{
  "id": 1,
  "title": "Título del episodio",
  "description": "Descripción del episodio",
  "audioUrl": "URL_del_audio.mp3",
  "duration": "25:30",
  "guests": ["Invitado 1", "Invitado 2"]
}
```

### Personalizar estilos
Modifica `style.css` para cambiar colores, fuentes y diseño según tus preferencias.

## 🔧 Características Técnicas

- **Responsive Design**: Compatible con dispositivos móviles y desktop
- **Audio HTML5**: Reproducción nativa sin dependencias externas
- **Búsqueda Client-side**: Filtrado rápido sin necesidad de servidor
- **Progressive Enhancement**: Funciona incluso sin JavaScript habilitado

## 🤝 Contribuir

1. Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue o contactarnos.

---

**¡Disfruta de las conversaciones generadas por IA sobre emprendimiento! 🤖☕🚀**
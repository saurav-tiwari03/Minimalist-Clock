# ⏰ Saurav's Minimalist Clock

[![Live Demo](https://img.shields.io/badge/Live%20Demo-clock.sauravgo.fun-blue?style=for-the-badge)](https://clock.sauravgo.fun)
[![GitHub](https://img.shields.io/badge/GitHub-saurav--tiwari03-181717?style=for-the-badge&logo=github)](https://github.com/saurav-tiwari03)
[![Read Time](https://img.shields.io/badge/Read%20Time-2%20min-green?style=for-the-badge)]()

> A stunning, minimalist flip clock web app inspired by the classic Fliqlo screensaver. Built with React and featuring smooth animations, multiple modes, and beautiful themes.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🕐 **Flip Clock** | Beautiful flip card animations with smooth transitions |
| ⏱️ **Stopwatch** | Precise stopwatch with centisecond accuracy |
| ⏲️ **Timer** | Countdown timer with custom time input and alarm sound |
| 🎨 **6 Themes** | Dark, Light, Midnight, Forest, Ocean, Warm |
| ❄️ **Snow Effect** | Animated snowfall overlay for cozy vibes |
| 📱 **PWA Support** | Install on any device, works offline |
| 🖥️ **Fullscreen** | Immersive fullscreen mode |
| 🔢 **12/24 Hour** | Toggle between time formats |
| 📐 **Responsive** | Perfect on mobile, tablet, and desktop |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/saurav-tiwari03/fliqlo-clock.git

# Navigate to project directory
cd fliqlo-clock

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🎮 Usage

### Modes
Use the **left/right arrows** or open **Settings** to switch between:
- **Clock** - Display current time with flip animation
- **Stopwatch** - Track elapsed time with precision
- **Timer** - Set countdown with alarm notification

### Settings
Click the ⚙️ gear icon to access:
- Mode selection (Clock/Stopwatch/Timer)
- Time format (12H/24H) - *Clock mode only*
- Show/hide seconds - *Clock mode only*
- Theme selection

### Keyboard Shortcuts
- `F11` or click **FULLSCREEN** - Toggle fullscreen mode

---

## 🎨 Themes

| Theme | Preview |
|-------|---------|
| **Dark** | Classic black background |
| **Light** | Clean white aesthetic |
| **Midnight** | Deep blue night vibes |
| **Forest** | Calming green tones |
| **Ocean** | Cool teal atmosphere |
| **Warm** | Cozy amber glow |

---

## 📱 PWA Installation

### On Mobile (iOS/Android)
1. Open [clock.sauravgo.fun](https://clock.sauravgo.fun) in your browser
2. Tap **Share** → **Add to Home Screen**
3. The app works offline!

### On Desktop (Chrome/Edge)
1. Visit [clock.sauravgo.fun](https://clock.sauravgo.fun)
2. Click the install icon in the address bar
3. Or: Menu → Install Saurav's Minimalist Clock

---

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Vite PWA Plugin** - Offline Support
- **CSS3** - Animations & Styling
- **Canvas API** - Snow Effect

---

## 📁 Project Structure

```
fliqlo-clock/
├── public/
│   ├── icons/          # PWA icons
│   ├── robots.txt      # SEO
│   ├── sitemap.xml     # SEO
│   └── og-image.png    # Social preview
├── src/
│   ├── assets/         # Alarm sound
│   ├── components/     # React components
│   │   ├── Clock.jsx
│   │   ├── Stopwatch.jsx
│   │   ├── Timer.jsx
│   │   ├── FlipCard.jsx
│   │   ├── Settings.jsx
│   │   └── SnowEffect.jsx
│   ├── styles/         # CSS files
│   ├── hooks/          # Custom hooks
│   └── App.jsx         # Main app
├── index.html          # Entry point with SEO
└── vite.config.js      # Vite + PWA config
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Saurav Tiwari**

- GitHub: [@saurav-tiwari03](https://github.com/saurav-tiwari03)
- Website: [clock.sauravgo.fun](https://clock.sauravgo.fun)

---

<p align="center">
  Made with ❤️ by Saurav Tiwari
</p>

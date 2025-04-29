# Heimweh Challenge Website

Eine moderne, responsive Website für die "Heimweh Challenge", inspiriert vom Design der iiicon.de Website.

## Übersicht

Diese Website dient dazu, TikTok-Nutzer dazu zu ermutigen, kreative Videos mit dem Song "Heimweh" zu erstellen und einzureichen, um Preise zu gewinnen. Das Design ist modern, interaktiv und mit zahlreichen Animationen versehen, um Besucher zum Teilnehmen zu motivieren.

## Funktionen

- Responsives Design für alle Geräte
- Moderne UI mit animierten Elementen und dynamischen Effekten
- Custom Cursor für ein einzigartiges Benutzererlebnis
- Countdown-Timer bis zum Ende der Challenge
- Audio-Player für den Song "Heimweh"
- TikTok-Style Vorschau
- Statistik-Counter mit Animationen
- Interaktives Einreichungsformular
- Animierte Preis-Anzeige
- Scroll-basierte Animationen
- Benutzerfreundliche Navigation

## Dateien

- `index.html` - Hauptstruktur der Website
- `styles.css` - Styling der Website mit modernen Effekten
- `script.js` - JavaScript für Animationen und Interaktionen
- `assets/` - Ordner für Medieninhalte

## Benötigte Medien

Um die Website vollständig funktionsfähig zu machen, sollten folgende Mediendateien hinzugefügt werden:

- `assets/background.mp4` - Hintergrundvideo für den Hero-Bereich
- `assets/heimweh-preview.mp3` - Audio-Vorschau des Songs

## Anpassung

### Countdown-Timer

Der Countdown ist auf 18 Tage ab dem aktuellen Datum eingestellt. Um das Enddatum anzupassen, bearbeite folgende Zeile in `script.js`:

```javascript
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 18); // Ändere die Anzahl der Tage hier
```

### Statistiken

Die Statistik-Zahlen können in `index.html` angepasst werden:

```html
<div class="stat-number" data-count="432">0</div> <!-- Teilnehmer-Zahl -->
<div class="stat-number" data-count="18">0</div> <!-- Verbleibende Tage -->
<div class="stat-number" data-count="600">0</div> <!-- Preisgelder -->
```

### Bilder und Videos

Um ein eigenes Hintergrundbild oder -video hinzuzufügen:

- Speichere dein Video als `assets/background.mp4`
- Oder ändere die URL in `index.html`

Alternativ kannst du auch einen statischen Hintergrund verwenden, indem du folgende Zeile in `styles.css` änderst:

```css
.hero {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('dein-bild-hier.jpg') no-repeat center center/cover;
}
```

### Farben

Die Hauptfarben können in der `:root`-Sektion in `styles.css` angepasst werden:

```css
:root {
    --primary-color: #ff3c5a; /* Hauptfarbe */
    --secondary-color: #2185d5; /* Sekundärfarbe */
    --accent-color: #9933ff; /* Akzentfarbe */
    --dark-color: #111; /* Dunkler Hintergrund */
    --darker-color: #0a0a0a; /* Sehr dunkler Hintergrund */
    --light-color: #f4f4f4; /* Heller Hintergrund */
    --text-color: #fff; /* Textfarbe */
    --gray-color: #333; /* Grauer Hintergrund */
    --gray-darker: #222; /* Dunklerer Grauton */
    --gray-lighter: #444; /* Hellerer Grauton */
}
```

## Formularverarbeitung

Das Formular ist derzeit nur für die Frontend-Demonstration konfiguriert. Um tatsächliche Einsendungen zu sammeln, muss eine serverseitige Verarbeitung hinzugefügt werden (z.B. PHP, Node.js oder ein Formular-Service wie Formspree).

### Formularanpassung

Um das Formular an einen Server anzubinden, bearbeite die `script.js`-Datei und füge die entsprechende Logik im Event-Listener für das Formular hinzu:

```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form validation code...
    
    // Beispiel für Fetch API zur Übermittlung der Daten an einen Server
    fetch('dein-server-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            videoLink: videoLink,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Deine Teilnahme wurde erfolgreich eingereicht!', 'success');
        form.reset();
    })
    .catch(error => {
        showNotification('Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.', 'error');
    });
});
```

## Browser-Kompatibilität

Die Website verwendet moderne CSS-Eigenschaften und JavaScript-Funktionen, die in allen aktuellen Browsern unterstützt werden. Für ältere Browser (wie IE11) könnte es nötig sein, Polyfills hinzuzufügen.

## Lizenz

Dieses Projekt ist ausschließlich für den Gebrauch durch den Auftraggeber bestimmt. 
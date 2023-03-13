# Dokumentation

## Aufbau

Nochmal zu Angular:

- Komponente besteht aus:
  - component.ts = TypeScript Code, d.h. Klassendefinition, Funktionen, Service-Injection, Objekte
  - component.html = Visuelles Template der Komponente
    - kann mit der .ts kommunizieren siehe z.B. src/app/components/user-pages/login/login.component.html
      - \<form [formGroup]="loginForm">\</form>
      - loginForm ist Bestandteil der component.ts (für das Formular zuständig)
  - component.css = Styling des HTML Template

Einstiegspunkte:

- app.module.ts
  - Gibt Konfigurationen an:
    - Import von Angular Material Komponenten
    - Festlegung von Services, die zum Programmstart initialisiert werden (-> Singleton-Pattern; nur eine Instanz von jedem Service)
- app-routing.module.ts
  - Legt die Routen fest (z.B. '/login', '/register')
  - Bei den designierten Routen frägt der AuthGuard jedesmal die Authentifizierung ab
- auth.guard.ts
  - Implementiert das Interface canActivate
    - canActivate wird im app-routing.module.ts bei den geschützten Routen festgelegt und jedesmal wenn die Route aufgerufen wird (z.B. '/user-rides') abgefragt
    - Hier wird einfach ein boolean isLoggedIn aus dem AuthService abgefragt
    - Nicht eingeloggt = zurück zu '/login'
    - Eingeloggt = Zugriff auf die Route
    - Klasse AuthGuard bekommt den AuthService über seinen Konstruktor injected (-> Dependency Injection; Singleton)
- material.module.ts
  - Nur für den übersichtlichen Import der Angular-Material Komponenten benötigt
  - Exportiert die von der App benötigten Komponenten (also nicht alle importierten)
  - Ablauf
    - material.module.ts (z.B. Button-Komponente) -> app.module.ts -> Komponente, wo die Button-Komponente gebraucht wird
- app.component (.ts/.html/.css)
  - In app.module.ts als bootstrap markiert, heißt nachdem die Module geladen sind wird die Komponente initialisiert
  - .ts:
    - Subscribed auf die aktuelle Route (also bekommt jede Änderung davon mit), um zu entscheiden welcher Header in der .html angezeigt wird
    - Gibt die aktuelle Route an den DataService (wird hier auch jedesmal aktualisiert)
    - Gibt den geladenen Drawer (die ausfahrbare seitliche Navigationsleiste) in den DrawerService, damit dieser auch von anderen Komponenten aus geschlossen werden kann (teilt also den Drawer mit Anderen)
  - .html:
    - Alles im mat-drawer-container eingeschlossen, wobei der mat-drawer selbst "unsichtbar" ist, bis dieser ausgefahren wird
    - Entscheidet anhand der aktiven Route, welcher Header angezeigt wird
      - /login, /register, /reset-password, /mode-selection = app-header-login
      - alle anderen = app-header (und gibt an diesen die aktive Route weiter)
    - \<router-outlet> = zeigt Komponente der aktuellen Route entsprechend an (siehe app-routing.module.ts)

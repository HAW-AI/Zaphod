# Zaphod
Zaphod ist eine Karteikarten-Webapp. Grundsätzlicher Gedanke ist eine Kernanwendung mit einer RESTful-API zu entwickeln. Grafische Oberflächen sollen erst im zweiten Schritt folgen.

## Styleguide - CodeConventions
Es wird erwartet sich an Rails-Konventionen zu halten. Eine gute Zusammenfassung dazu findet man unteranderem im [Github-Styleguide].

## Abhängigkeiten
### Backend
* **[Ruby on Rails]** als Basisframework
* **[Devise]** für Benutzerauthentifizierung
* **[CanCan]** für Benutzerautorisierung
* **[InheritedResources]** für faule Entwickler (default RESTful-Verhalten)
* **[RSpec]** für Testung
* **[Rabl]** für JSON-Templates

### Frontend
* **[Backbone]** als Basisframework ([Buch])
* **[Underscore]** als Ergänzung zur JS-Standardbibliothek
* **[Handlebars]** als Template-Engine
* **[Jasmine]** als Testing-Framework



[Ruby on Rails]: http://rubyonrails.org/
[Devise]: https://github.com/plataformatec/devise
[CanCan]: https://github.com/ryanb/cancan
[InheritedResources]: https://github.com/josevalim/inherited_resources
[RSpec]: http://rspec.info/
[Rabl]: https://github.com/nesquena/rabl
[Github-Styleguide]: https://github.com/styleguide "GitHub coding styleguide"
[Backbone]: http://documentcloud.github.com/backbone/
[Buch]: http://addyosmani.github.com/backbone-fundamentals/
[Underscore]: http://documentcloud.github.com/underscore/
[Handlebars]: http://handlebarsjs.com/
[Jasmine]: https://jasmine.github.io/

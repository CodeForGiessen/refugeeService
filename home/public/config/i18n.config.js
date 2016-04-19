(function () {
    'use strict';
    angular.module('refugeeAuthorEnv')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.translations('de', {
                    'APP_TITLE': 'Refugees Gießen',
                    'MAIN_TITLE': 'Willkommen.',
                    'MAIN_TEXT1': 'Diese Seite dient dazu, die Inhalte der dazugehörigen App zu erstellen, bearbeiten und löschen.',
                    'MAIN_TEXT2': 'Alle Texte können hier in unterschiedlichen Sprachen erstellt und übersetzt werden.',
                    'MAIN_TEXT3': 'Zusätzlich können Statistiken angezeigt werden.',
                    'LOGIN_TABLOGIN': 'Einloggen',
                    'LOGIN_TABREGISTER': 'Registrieren',
                    'LOGINTAB_USERNAME': 'Username',
                    'LOGINTAB_PASSWORD': 'Passwort',
                    'LOGINTAB_LOGINBTN': 'Einloggen',
                    'REGISTERTAB_MAIL': 'E-Mail',
                    'REGISTERTAB_USERNAME': 'Username',
                    'REGISTERTAB_NAME': 'Vorname',
                    'REGISTERTAB_SURNAME': 'Nachname',
                    'REGISTERTAB_PASSWORD': 'Passwort',
                    'REGISTERTAB_CPASSWORD': 'Passwort bestätigen',
                    'REGISTERTAB_REGISTERBTN': 'Registrieren',
                    'HEADER_LOGINBTN': 'Einloggen/Registrieren',
                    'HEADER_SETTINGSBTN': 'Nutzerverwaltung',
                    'HEADER_LOGOUTBTN': 'Ausloggen',
                    'HEADER_LANGBTN': 'Sprache',
                    'HEADER_ACCBTN': 'Nutzerkonto',
                    'NAVBAR_CONTENTBTN': 'Inhalte',
                    'NAVBAR_LISTBTN': 'Daten Listen',
                    'NAVBAR_ADDBTN': 'Daten Hinzufügen',
                    'NAVBAR_APIBTN': 'API',
                    'NAVBAR_DOCBTN': 'Dokumentation',
                    'FOOTER_INFOTEXT': 'Dies ist ein Projekt des OK Lab Gießen.',
                    'FOOTER_ABOUT': 'Impressum',
                    'LANGMODAL_TITLE': 'Wähle eine Sprachen',
                    'LANGMODAL_DE': 'Deutsch',
                    'LANGMODAL_EN': 'Englisch'
                })
                .translations('en', {
                    'APP_TITLE': 'Refugees Gießen',
                    'MAIN_TITLE': 'Welcome.',
                    'MAIN_TEXT1': 'This page is used to create, update and delete the content for the companion app.',
                    'MAIN_TEXT2': 'Texts can be written in different languages or can be translated.',
                    'MAIN_TEXT3': 'Furthermore statistics can be viewed.',
                    'LOGIN_TABLOGIN': 'Login',
                    'LOGIN_TABREGISTER': 'Register',
                    'LOGINTAB_USERNAME': 'Username',
                    'LOGINTAB_PASSWORD': 'Password',
                    'LOGINTAB_LOGINBTN': 'Login',
                    'REGISTERTAB_MAIL': 'E-Mail',
                    'REGISTERTAB_USERNAME': 'Username',
                    'REGISTERTAB_NAME': 'Name',
                    'REGISTERTAB_SURNAME': 'Surname',
                    'REGISTERTAB_PASSWORD': 'Password',
                    'REGISTERTAB_CPASSWORD': 'Confirm Password',
                    'REGISTERTAB_REGISTERBTN': 'Register',
                    'HEADER_LOGINBTN': 'Login/Register',
                    'HEADER_SETTINGSBTN': 'Usercontrol',
                    'HEADER_LOGOUTBTN': 'Logout',
                    'HEADER_LANGBTN': 'Language',
                    'HEADER_ACCBTN': 'Account',
                    'NAVBAR_CONTENTBTN': 'Content',
                    'NAVBAR_LISTBTN': 'List data',
                    'NAVBAR_ADDBTN': 'Add data',
                    'NAVBAR_APIBTN': 'API',
                    'NAVBAR_DOCBTN': 'Documentation',
                    'FOOTER_INFOTEXT': 'This is a OK Lab Gießen Project.',
                    'FOOTER_ABOUT': 'About',
                    'LANGMODAL_TITLE': 'Choose a language',
                    'LANGMODAL_DE': 'German',
                    'LANGMODAL_EN': 'English'
                })
                .preferredLanguage('en')
                .useSanitizeValueStrategy('escape');
        }]);
})();
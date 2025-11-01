// Assurez-vous que jQuery est chargé avant ce script.

$(document).ready(function() {
    const $album = $('#monAlbum');
    const albumElement = $album[0];
    const $container = $('.flip-book-container');
    
    let isInitialized = false;

    // Fonction pour ajuster la taille de l'album de manière responsive
    function resizeAlbum() {
        // Définir la taille de l'album en fonction du conteneur
        const containerWidth = $container.width();
        const containerHeight = $container.height();
        
        // Exemple de ratio de page (par exemple, 4:3)
        const pageWidth = Math.min(containerWidth * 0.45, containerHeight * 0.75 * 4/3); 
        const pageHeight = pageWidth * 3 / 4; // 4:3 ratio (ajustez si besoin)
        const albumWidth = pageWidth * 2;
        
        if (!isInitialized) {
            // 1. Appliquer la classe 3D au démarrage
            albumElement.classList.add('book-closed-3d');
            
            // 2. Initialiser Turn.js
            $album.turn({
                width: albumWidth,
                height: pageHeight,
                autoCenter: true,
                display: 'double',
                acceleration: true,
                when: {
                    // Événement déclenché quand l'utilisateur tourne une page
                    turning: function(event, page, view) {
                        // Si on passe de la page 1 (couverture) à la page 2, on est ouvert
                        if (page === 2) {
                            albumElement.classList.remove('book-closed-3d');
                        }
                    },
                    // Événement déclenché quand le livre se ferme
                    turned: function(event, page, view) {
                        // Si on est sur la page 1 ou la dernière page (et qu'il est fermé)
                        const totalPages = $album.turn('pages');
                        if (page === 1 || page === totalPages) {
                             albumElement.classList.add('book-closed-3d');
                        }
                    }
                }
            });
            isInitialized = true;
        } else {
            // Redimensionner l'album après l'initialisation
            $album.turn('size', albumWidth, pageHeight);
        }
        
        // Rendre l'album visible après avoir défini les dimensions
        $album.css('visibility', 'visible');
    }

    // Lancer le redimensionnement au chargement et sur le redimensionnement de la fenêtre
    resizeAlbum();
    $(window).resize(resizeAlbum);

    // Alternative: Gérer l'ouverture par un clic sur la couverture (si Turn.js n'est pas initialisé sur la page 1)
    /*
    $album.on('click', function() {
        if (albumElement.classList.contains('book-closed-3d')) {
            $album.turn('next'); // Ouvre le livre
            albumElement.classList.remove('book-closed-3d');
        }
    });
    */
});
export function loadFooter() {
    const footer = document.getElementById('footer');

    if (!footer) {
        console.error('Footer container not found');
        return;
    }

    fetch('/includes/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not load footer: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            footer.innerHTML = data;
        })
        .catch(error => {
            console.error('Footer loading failed:', error);
        });
}
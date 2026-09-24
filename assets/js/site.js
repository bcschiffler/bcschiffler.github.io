// Lightbox for project figures. Without JavaScript (or <dialog> support)
// the thumbnails simply link to the full-size image.
(() => {
	const dialog = document.querySelector(".lightbox");
	if (!dialog || typeof dialog.showModal !== "function") return;

	const caption = dialog.querySelector("figcaption");
	const image = document.createElement("img");
	caption.before(image);
	const darkScheme = window.matchMedia("(prefers-color-scheme: dark)");

	document.addEventListener("click", (event) => {
		const link = event.target.closest("a[data-lightbox]");
		if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

		event.preventDefault();
		const thumbnail = link.querySelector("img");
		// Screenshots come in light and dark variants; show the one matching the page.
		image.src = (darkScheme.matches && link.dataset.darkHref) || link.href;
		image.alt = thumbnail ? thumbnail.alt : "";
		caption.textContent = link.dataset.caption || "";
		dialog.showModal();
	});

	// Click anywhere to dismiss; Escape and the close button are handled natively.
	dialog.addEventListener("click", () => dialog.close());
	dialog.addEventListener("close", () => image.removeAttribute("src"));
})();

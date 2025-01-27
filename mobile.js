(() => {
  let highestZ = 1;

  class Paper {
    holdingPaper = false;
    touchStartX = 0;
    touchStartY = 0;
    currentPaperX = 0;
    currentPaperY = 0;
    holdTimeout = null;

    init(paper) {
      paper.style.touchAction = "none";

      paper.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;

        this.holdTimeout = setTimeout(() => {
          this.holdingPaper = true;
          paper.style.zIndex = highestZ++;
          paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) scale(1.1)`;
        }, 300);
      });

      paper.addEventListener("touchmove", (e) => {
        if (!this.holdingPaper) return;
        e.preventDefault();

        const deltaX = e.touches[0].clientX - this.touchStartX;
        const deltaY = e.touches[0].clientY - this.touchStartY;

        this.currentPaperX += deltaX;
        this.currentPaperY += deltaY;

        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) scale(1.1)`;

        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      });

      paper.addEventListener("touchend", () => {
        clearTimeout(this.holdTimeout);
        this.holdingPaper = false;
        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) scale(1)`;
      });
    }
  }

  const papers = document.querySelectorAll(".paper");

  papers.forEach((paper) => {
    const p = new Paper();
    p.init(paper);
  });
})();

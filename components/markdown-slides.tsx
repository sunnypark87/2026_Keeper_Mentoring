type MarkdownSlidesProps = {
  slides: string[];
};

function buildSlideSource(slides: string[]) {
  return slides
    .map(
      (slide) =>
        `<!-- .slide: class="markdown-slide" -->\n${slide.trim()}`,
    )
    .join("\n---\n");
}

export function MarkdownSlides({ slides }: MarkdownSlidesProps) {
  return (
    <section data-markdown="">
      <textarea data-template="" defaultValue={buildSlideSource(slides)} />
    </section>
  );
}

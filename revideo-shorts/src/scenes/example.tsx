import {Audio, Img, Txt, Video, Layout, makeScene2D} from '@revideo/2d';
import {all, any, chain, createRef, waitFor, useScene, spring, SmoothSpring, easeInExpo, easeOutExpo, Reference} from '@revideo/core';

interface Word {
  text: string;
  startInSeconds: number;
}

export default makeScene2D(function* (view) {
  const textBox = createRef<Layout>();
  const vidRef = createRef<Video>();
  const words: Word[] = useScene().variables.get("transcription", [])();

  yield view.add(
    <>
      <Video
        src={'/argil_scaled_60s.mp4'}
        size={['100%', '100%']}
        play={true}
        ref={vidRef}
      />
      <Layout
        size={"100%"}
        ref={textBox}
      />
    </>,
  );

  yield* any(
    displayWords(textBox, words),
    waitFor(vidRef().getDuration())
  )

});

function* displayWords(textBox: Reference<Layout>, words: Word[]){
  // Wait for the first word's start time
  yield* waitFor(words[0].startInSeconds);

  for (let i = 0; i < words.length; i++) {
    const textRef = createRef<Txt>();
    const textRef2 = createRef<Txt>();

    const textProps = {
      text: words[i].text.toUpperCase(),
      fontFamily: "Rubik",
      fontWeight: 700,
      fontSize: 100 * 0.8,
      fill: "white",
      fontStyle: "bold",
      y: 570,
      rowGap: 10,
      letterSpacing: 0,
    };

    yield textBox().add(
      <>
        <Txt
          {...textProps}
          ref={textRef}
          stroke={"black"}
          lineWidth={20}
          lineJoin={"round"}
        />
        <Txt
          {...textProps}
          ref={textRef2}
          lineJoin={"round"}
        />
      </>
    );


    yield* all(
      textRef().scale(1/0.8, 0.15, easeOutExpo), textRef().position.y(textRef().position.y()-30, 0.15, easeOutExpo),
      textRef2().scale(1/0.8, 0.15, easeOutExpo), textRef2().position.y(textRef().position.y()-30, 0.15, easeOutExpo)
    );

    // Calculate the duration to display this word
    const wordDuration = (words[i + 1]?.startInSeconds || words[i].startInSeconds + 1) - words[i].startInSeconds;
    yield* waitFor(wordDuration - 0.15);

    // Remove the text after waiting
    textRef()?.remove();
    textRef2()?.remove();

    // If there's a next word, wait for the gap between words
    if (i < words.length - 1) {
      const gap = words[i + 1].startInSeconds - (words[i].startInSeconds + wordDuration);
      if (gap > 0) {
        yield* waitFor(gap);
      }
    }
  }
}
gsap.registerPlugin(ScrollTrigger, TextPlugin, EasePack);


// Button click animation
const button = document.querySelector('#intro button')
const buttonText = button.querySelector('span')
button.addEventListener('click', ()=> handleClick())

const handleClick = () => {
  gsap.to(buttonText, {
    opacity: 0,
    width: 0,
    duration: .1,
  })

  gsap.to(button, {
    width: "0px",
    height: "0px",
    duration: .5,
    delay: .3,
    ease: "power1.out",
  })

  gsap.to(button, {
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: -1,
    borderRadius: "",
    delay: .9,
    duration: .3,
    ease: "power4.in",
    yoyo:true,
    onComplete: () => {
      setTimeout(()=> {
        animateBlocks()
      }, 200 )
    }
  })
}

// Blocks animation

const animateBlocks = () => {
  const blocks = document.querySelector('#blocks')
  const blocksQtt = 6

  for (let i = 0; i < blocksQtt; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    blocks.appendChild(block)
    const background = `#333`
    block.style.background = background
    const blocksTailwindStyles = `flex-1 translate-y-[-100%]`
    block.setAttribute('class', blocksTailwindStyles)

    gsap.to(block, {
      y: 0,
      duration: .2,
      delay: i * .3,
      zIndex: -1,
      onComplete: () => {
        blocks.style.pointerEvents = 'none'
        if (i === blocksQtt - 1) {
          showHome()
        }
      }
    })
  }
}

// First section animation

const showHome = () => {
  const firstSection = document.querySelector('#home')
  const textWrapper = firstSection.querySelector('#home__text-wrapper')

  gsap.to(firstSection, {
    opacity: 1,
    duration: .5,
  })
  const text = "Explore o poder da criatividade e dê vida às suas ideias!"

  machineGun(textWrapper, text);
}


const _sentenceEndExp = /(\.|\?|!)$/g;

function machineGun(container, text) {
  let words = text.split(" "),
      tl = gsap.timeline({delay:0.6, repeat:2, repeatDelay:4}),
      wordCount = words.length,
      time = 0,
      word, element, duration, isSentenceEnd, i;
  
  for(i = 0; i < wordCount; i++){
    word = words[i];
    isSentenceEnd = _sentenceEndExp.test(word);
    element = document.createElement("h3")
    element.innerHTML = word;
    container.appendChild(element)
    duration = Math.max(0.5, word.length * 0.08); //longer words take longer to read, so adjust timing. Minimum of 0.5 seconds.
    if (isSentenceEnd) {
      duration += 0.6; //if it's the last word in a sentence, drag out the timing a bit for a dramatic pause.
    }
    //set opacity and scale to 0 initially. We set z to 0.01 just to kick in 3D rendering in the browser which makes things render a bit more smoothly.
    gsap.set(element, {autoAlpha:0, scale:0, z:0.01});
    //the SlowMo ease is like an easeOutIn but it's configurable in terms of strength and how long the slope is linear. See https://www.greensock.com/v12/#slowmo and https://api.greensock.com/js/com/greensock/easing/SlowMo.html
    tl.to(element, duration, {scale:1.2,  ease:"slow(0.25, 0.9)"}, time)
      //notice the 3rd parameter of the SlowMo config is true in the following tween - that causes it to yoyo, meaning opacity (autoAlpha) will go up to 1 during the tween, and then back down to 0 at the end. 
		 	.to(element, duration, {autoAlpha:1, ease:"slow(0.25, 0.9, true)"}, time);
    time += duration - 0.05;
    if (isSentenceEnd) {
      time += 0.6; //at the end of a sentence, add a pause for dramatic effect.
    }

    if (i === wordCount - 1) {
      tl.call(() => {
        // container.remove()
        tl.kill()

        // Anima outra coisa
      });
    }
  }
  
}
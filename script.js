console.log( '😀👍🍎' );

gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector(".container");
const colors = [
    "#FF4D80",
    "#FF3E41",
    "#DF367C",
    "#883955",
    "#4C3549",
    "#88498F",
    "#423E3B",
];

let panelCreated = false;
let panelNum = 2;
let panelIncrement = 1 / (panelNum - 1);

const createPanel = (index) => {
    const section = document.createElement("section");
    const h1 = document.createElement("h1");
    container.appendChild(section);
    section.appendChild(h1);
    h1.innerHTML = `Panel ${index}`;
    gsap.set(section, {
        backgroundColor: colors[gsap.utils.random(0, colors.length-1, 1)],
        className: `panel-${index}`
    }); 
};

ScrollTrigger.create({
    trigger: document.body,
    start: 0,
    end: "max",
    onUpdate: (self) => {
        if (self.progress >= 1 - panelIncrement / 6 && self.getVelocity() >= 0) {
          createPanel(++panelNum);
          panelIncrement = 1 / (panelNum - 1);
          self.setPositions(0, ScrollTrigger.maxScroll(window));
        }
    },
  snap: (value, st) => {
    return ScrollTrigger.snapDirectional(panelIncrement)(value, st.getVelocity() >= 0 ? 1 : -1);
  }
});
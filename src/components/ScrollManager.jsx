
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import { useEffect } from "react";


export const ScrollManager = (props) => {
    const {section, onSectionChange} = props;

    const data = useScroll();
    const lastScroll = useRef(0);
    const isAnimating = useRef(false);


    data.fill.classList.add("top-0");
    data.fill.classList.add("absolute");
    

    useEffect(() => {
        gsap.to(data.el, {
            duration: section === data.pages - 1 ? 0.8 : 1.2,
            scrollTop: section * data.el.clientHeight,
            ease: "power2.inOut",
            onStart: () => {
                isAnimating.current = true;
            },
            onComplete: () => {
                isAnimating.current = false;
            },
        });
    }, [section]); 

    useFrame(() => {
        
        if (isAnimating.current) {
            lastScroll.current = data.scroll.current;
            return;
        }
    
        const curSection = Math.floor(data.scroll.current * data.pages);
        const scrollingDown = data.scroll.current > lastScroll.current;
        
        // Scroll-Schwelle - wie weit muss gescrollt werden, um einen Wechsel auszulösen
        const threshold = 0.01;
        
        // Nach unten scrollen - für alle Sektionen
        if (scrollingDown) {
            // Einfachere, allgemeine Bedingung
            if (curSection > section) {
                onSectionChange(curSection);
            }
        }
        // Nach oben scrollen - für alle Sektionen
        else {
            if (section === data.pages - 1 && data.scroll.current < 0.95) {
                onSectionChange(section - 1);
            }
            // Spezifische Bedingungen für jede Sektion beim Hochscrollen
            if (curSection < section) {
                onSectionChange(curSection);
            }
        }
        
        lastScroll.current = data.scroll.current;
    });
    
    return null;

}

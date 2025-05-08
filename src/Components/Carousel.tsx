import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import useTheme from "../hooks/useTheme";
import { useResponsiveSize } from "../hooks/useResponsiveSize";
import CardTest from "./Card";
import { CarouselCardType, useNavigation } from "../contexts/NavigationContext";

/**
 * Props interface for the 3D rotating carousel
 */
type CarouselProps = {
  radius?: number;
  cardColor?: string;
  textColor?: string;
  rotationSpeed?: number;
  zoomFactor?: number;
  mobileZoomFactor?: number;
  zoomSpeed?: number;
};

// Available cards in the carousel
const cardItems: CarouselCardType[] = [
  "About",
  "Projects",
  "Contact",
  "Settings",
];

// Mapping between card names and their visual positions
const cardPositionMap = {
  About: 2, // Position visuelle différente
  Projects: 1,
  Contact: 0, // Position visuelle différente
  Settings: 3,
};

/**
 * 3D Carousel component that displays cards in a circular arrangement
 */
export const Carousel = ({
  radius = 2,
  cardColor,
  textColor,
  rotationSpeed = 0.2,
  zoomFactor = 0.7,
  mobileZoomFactor = 0.9,
  zoomSpeed = 0.03,
}: CarouselProps) => {
  // Refs for the group and rotation handling
  const groupRef = useRef<THREE.Group>(null);
  const defaultZ = useRef(5);
  const targetRotationY = useRef<number | null>(null);
  const swipeStartX = useRef<number | null>(null);

  // Interactive state
  const [isHovering, setIsHovering] = useState(false);

  // Hooks for theme, responsiveness and navigation
  const { colors, isDarkMode } = useTheme();
  const screenSize = useResponsiveSize();
  const { camera, gl } = useThree();
  const { currentCard, isAutoRotationPaused, rotateToCard } = useNavigation();

  // Derived values for responsiveness and theming
  const isMobileOrTablet = screenSize === "mobile" || screenSize === "tablet";
  const finalCardColor =
    cardColor || (isDarkMode ? colors.primary : colors.neutral);
  const finalTextColor =
    textColor || (isDarkMode ? colors.background : colors.secondary);

  // Set up touch event handlers
  useEffect(() => {
    // Function to find adjacent cards
    const findAdjacentCards = (currentCardName: CarouselCardType) => {
      if (!currentCardName) {
        return {
          nextCard: "About" as CarouselCardType,
          prevCard: "Settings" as CarouselCardType,
        };
      }

      const currentIndex = cardItems.findIndex(
        (item) => item === currentCardName
      );
      const nextIndex = (currentIndex + 1) % cardItems.length;
      const prevIndex =
        (currentIndex - 1 + cardItems.length) % cardItems.length;

      return {
        nextCard: cardItems[nextIndex],
        prevCard: cardItems[prevIndex],
      };
    };

    // Handler for touch start
    const handleTouchStart = (e: TouchEvent) => {
      swipeStartX.current = e.touches[0].clientX;
    };

    // Handler for touch end
    const handleTouchEnd = (e: TouchEvent) => {
      if (swipeStartX.current === null) return;

      const swipeEndX = e.changedTouches[0].clientX;
      const swipeDistance = swipeStartX.current - swipeEndX;

      // Minimum distance to be considered a swipe
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance && currentCard) {
        const { nextCard, prevCard } = findAdjacentCards(currentCard);

        if (swipeDistance > 0) {
          // Swipe left, go to next card
          rotateToCard(nextCard);
        } else {
          // Swipe right, go to previous card
          rotateToCard(prevCard);
        }
      }

      swipeStartX.current = null;
    };

    // Add event listeners to the canvas
    const canvas = gl.domElement;
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Cleanup
    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [gl, currentCard, rotateToCard]);

  // Effect to position carousel based on currentCard from context
  useEffect(() => {
    if (!groupRef.current || !currentCard) return;

    // Use the position map to get the correct visual position
    const targetPosition = cardPositionMap[currentCard];

    if (targetPosition !== undefined) {
      // Calculate target angle based on the position
      const targetAngle =
        Math.PI + (targetPosition / cardItems.length) * Math.PI * 2;
      targetRotationY.current = targetAngle;
    }
  }, [currentCard]);

  // Animation frame handler for rotation and camera zoom
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Rotation handling - either towards target or auto-rotation
    if (targetRotationY.current !== null) {
      // Smooth rotation towards target
      const newRotation = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY.current,
        0.05
      );

      groupRef.current.rotation.y = newRotation;

      // Stop animation when close enough to target
      if (
        Math.abs(groupRef.current.rotation.y - targetRotationY.current) < 0.01
      ) {
        groupRef.current.rotation.y = targetRotationY.current;
        targetRotationY.current = null;
      }
    } else if (!isAutoRotationPaused) {
      // Apply auto-rotation only when not paused
      groupRef.current.rotation.y += delta * rotationSpeed;
    }

    // Camera zoom management
    if (defaultZ.current === 3 && camera.position.z !== 3) {
      defaultZ.current = camera.position.z;
    }

    const currentZoomFactor = isMobileOrTablet ? mobileZoomFactor : zoomFactor;

    // Smooth zoom transition when hovering or on mobile/tablet
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      isHovering || isMobileOrTablet
        ? defaultZ.current * currentZoomFactor
        : defaultZ.current,
      zoomSpeed
    );
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => {
        setIsHovering(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setIsHovering(false);
        document.body.style.cursor = "default";
      }}
    >
      {cardItems.map((title, i) => {
        // Calculate position on the circle
        const angle = (i / cardItems.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        // Adjust card rotation based on device orientation
        const cardRotation: [number, number, number] = isMobileOrTablet
          ? [Math.PI / 2, 0, Math.PI / 2] // Portrait mode
          : [0, Math.PI / 2, 0]; // Landscape mode

        return (
          <group
            key={i}
            position={[x, 0, z]}
            rotation={[0, Math.PI + angle, 0]}
          >
            <group rotation={cardRotation}>
              <CardTest color={finalCardColor} />
            </group>
            <group position={[0, 0.1, 0]} rotation={[0, Math.PI, 0]}>
              <Text
                position={[0, 0, 0.01]}
                fontSize={0.2}
                color={finalTextColor}
                anchorX="center"
                anchorY="middle"
              >
                {title}
              </Text>
            </group>
          </group>
        );
      })}
    </group>
  );
};

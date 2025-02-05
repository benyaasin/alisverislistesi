import { useEffect, useState } from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
`;

const LoadingText = styled.h1`
  font-size: 2rem;
  color: #333;
  animation: pulse 1s infinite;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const Countdown = styled.div`
  font-size: 1.5rem;
  margin-top: 1rem;
  color: #666;
`;

export default function Loading() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (count === 0) {
      const container = document.querySelector('.loading-container');
      if (container) {
        container.classList.add('loading-fade-out');
        setTimeout(() => {
          container.remove();
        }, 500);
      }
    }
  }, [count]);

  return (
    <LoadingContainer>
      <LoadingText>LÜTFEN BEKLEYİNİZ</LoadingText>
      <Countdown>Bekleme sıranız: {count}</Countdown>
    </LoadingContainer>
  );
} 
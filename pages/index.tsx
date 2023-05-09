import { useEffect, useState } from 'react'

var texts = [
  '또다른 세상이 열리길 바라며...', '고민이 한 스푼 덜어지길 바라며...'
];
var emojis = [
  '✨', '🌟', '💛', '👋'
];
function random_emoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
};
function random_text() {
  return texts[Math.floor(Math.random() * texts.length)];
};
export default function Home() {
  const [emoji, setEmoji] = useState('');
  const [text, setText] = useState('');
  useEffect(() => {
    setEmoji(random_emoji());
    setText(random_text());
  }, []);
  return (
    <main className="full">
      <div>
        <h1>👀 By 🔈</h1>
        <h2>{text} {emoji}</h2>
      </div>
    </main>
  )
}

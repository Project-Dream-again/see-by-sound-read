//  pages\food\[pid].tsx
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSpeech } from "../../utils/get_tts";

const Post = (): JSX.Element => {
  const router = useRouter();
  const { pid } = router.query;
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // Firebase SDK 초기화
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDnNtF4yy8pdN85laIfnvP6rHBZHbl18A0",
        authDomain: "with-touch.firebaseapp.com",
        databaseURL: "https://with-touch-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "with-touch",
        storageBucket: "with-touch.appspot.com",
        messagingSenderId: "474339573185",
        appId: "1:474339573185:web:81c7b66b253385e7428340",
        measurementId: "G-6GWWBPYKNZ"
      });
    }

    // Firestore에서 문서 데이터 가져오기
    const db = firebase.firestore();
    const docRef = db.collection('foods').doc(pid as string);

    docRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setPost(data);
      } else {
        console.log('No such document!');
      }
    });
  }, [pid]);

  //음성 변환 목소리 preload
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  if (!post) {
    return <div>Loading...</div>
  }
  
  getSpeech("바코드" + pid + post.name + post.discription);
  return (
    <div>
      <p>바코드: {pid}</p>
      <div>
        <p>{post.name}</p>
        <p>{post.discription}</p>
      </div>
    </div>
  );
};

export default Post;
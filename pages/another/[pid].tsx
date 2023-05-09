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
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: "with-touch",
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });
    }
    console.log(process.env.FIREBASE_PROJECT_ID);
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
  if (post.whatisthing == "food") {
    //getSpeech("바코드" + pid + post.name + post.discription);
    return (
      <div>
        <p>🍔 바코드: {pid}</p>
        <div>
          <p>{post.name}</p>
          <p>{post.discription}</p>
        </div>
      </div>
    );
  }
  else if (post.whatisthing == "drink") {
    //getSpeech("바코드" + pid + post.name + post.discription);
    return (
      <div>
        <p>🍹 바코드: {pid}</p>
        <div>
          <p>{post.name}</p>
          <p>{post.discription}</p>
        </div>
      </div>
    );
  }
  else if (post.whatisthing == "medicine") {
    //getSpeech("바코드" + pid + post.name + post.discription);
    return (
      <div>
        <p>💊 바코드: {pid}</p>
        <div>
          <p>{post.name}</p>
          <p>{post.discription}</p>
        </div>
      </div>
    );
  }
  else {
    //getSpeech("바코드" + pid + post.name + post.discription);
    return (
      <div>
        <p>❓ 바코드: {pid}</p>
        <div>
          <p>{post.name}</p>
          <p>{post.discription}</p>
          <p>{post.howtoeat}</p>
          <p>{post.plscread}</p>
        </div>
      </div>
    );
  }
};

export default Post;
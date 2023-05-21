import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import TableComponent from '../../utils/food';

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
    const docRef = db.collection('menu').doc(pid as string);

    docRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setPost(data);
      } else {
        console.log('No such document!');
      }
    });
  }, [pid]);

  if (!post) {
    return <div>Loading...</div>
  }
  
  let data: { [key: string]: any } = {};
  console.log(data);
  data = post.menu
  return (
    <div>
      <ReactAudioPlayer
        src={"https://firebasestorage.googleapis.com/v0/b/with-touch.appspot.com/o/"+pid+".mp3?alt=media"}
        autoPlay
        controls
      />
      <div className="full">
        <p>📜 가게 이름: {post.name}</p>
        <div>
          <p>{post.description}</p>
          <TableComponent data={data} />
        </div>
      </div>
    </div>
  );

};

export default Post;
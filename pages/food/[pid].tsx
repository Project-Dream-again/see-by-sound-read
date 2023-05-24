import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import TableComponent from '@/utils/food';
const Post = (): JSX.Element => {
  const router = useRouter();
  const { pid } = router.query;
  const [post, setPost] = useState<any>(null);
  useEffect(() => {
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
  if (!post) {
    return <div className="full">Loading...</div>
  }
  const data = {
    '소비자 가격': {
      '': '',
      '가격': post.price,
      ' ': '',
    },
    '영양정보': {
      '': '',
      '칼로리': post.kcal,
      '  ': '',
      '나트륨': post.sodium,
      '탄수화물': post.carbohydrates,
      '당류': post.sugars,
      '지방': post.fats,
      '트랜스지방': post.trans_fats,
      '포화지방': post.saturated_fat,
      '콜레스테롤': post.cholesterol,
      '단백질': post.proteins,
      '칼슘': post.calcium,
      ' ': ''
    }
  };
  return (
    <div>
      <ReactAudioPlayer
        src={`https://firebasestorage.googleapis.com/v0/b/with-touch.appspot.com/o/${pid}.mp3?alt=media`}
        autoPlay
        controls
      />
      <div className="full">
        <br/>
        <p>{
          post.whatisthing === 'food' ? 
          '🍔' : post.whatisthing === 'drink' ? 
          '🍹' : post.whatisthing === 'medicine' ? 
          '💊' : '❓'
          } 바코드: {pid}
        </p>
        <br/> 
        <div>
          <p>{post.name}</p>
          <p>{post.description}</p>
          {post.whatisthing === 'medicine' && (
            <>
              <br/>
              <p>소비자 가격: {post.price}</p>
              <p>복용법: </p>
              <p dangerouslySetInnerHTML={ {__html: post.howtouse} }/>
              <br/>
              <p>주의사항: {post.plsread}</p>
            </>
          )}
          {post.whatisthing !== 'medicine' && post && (
            <TableComponent data={data} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Post;

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/storage";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
//import { getSpeech } from "../../utils/get_tts";
import ReactAudioPlayer from 'react-audio-player';
import TableComponent from '@/utils/food';

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

  let data: { [key: string]: any } = {};

  if (!post) {
    return <div>Loading...</div>
  }
  if (post.whatisthing == "food") {
    data = {
      '영양정보': {
        '': '',
        '칼로리' : post.kcal,
        '  ': '',
        '나트륨': post.sodium,
        '탄수화물': post.carbohydrates,
        '당류': post.sugars,
        '지방': post.fats,
        '트랜스지방': post.trans_fats,
        '포화지방': post.cholesterol,
        '콜레스테롤': post.cholesterol,
        '단백질': post.proteins,
        ' ': ''
      }
    };
    //getSpeech("바코드" + pid + post.name + post.description);
    return (
      <div>
        <ReactAudioPlayer
          src={"https://firebasestorage.googleapis.com/v0/b/with-touch.appspot.com/o/"+pid+".mp3?alt=media"}
          autoPlay
          controls
        />
        <div>
          <p>🍔 바코드: {pid}</p>
          <div>
            <p>{post.name}</p>
            <p>{post.description}</p>
            <br/>
            <TableComponent data={data} />
          </div>
        </div>
      </div>
    );
  }
  else if (post.whatisthing == "drink") {
    data = {
      '영양정보': {
        '': '',
        '칼로리' : post.kcal,
        '  ': '',
        '나트륨': post.sodium,
        '탄수화물': post.carbohydrates,
        '당류': post.sugars,
        '지방': post.fats,
        '트랜스지방': post.trans_fats,
        '포화지방': post.cholesterol,
        '콜레스테롤': post.cholesterol,
        '단백질': post.proteins,
        ' ': ''
      }
    };
    //getSpeech("바코드" + pid + post.name + post.description);
    return (
      <div>
        <ReactAudioPlayer
          src={"https://firebasestorage.googleapis.com/v0/b/with-touch.appspot.com/o/"+pid+".mp3?alt=media"}
          autoPlay
          controls
        />
        <div className="full">
          <br/>
          <p>🍹 바코드: {pid}</p>
          <br/> 
          <div>
            <p>{post.name}</p>
            <p>{post.description}</p>
            <br/>
            <TableComponent data={data} />
          </div>
        </div>
      </div>
    );
  }
  else if (post.whatisthing == "medicine") {
    //getSpeech("바코드" + pid + post.name + post.description);
    return (
      <div>
        <ReactAudioPlayer
          src={"https://firebasestorage.googleapis.com/v0/b/with-touch.appspot.com/o/"+pid+".mp3?alt=media"}
          autoPlay
          controls
        />
        <div>
          <p>💊 바코드: {pid}</p>
          <div>
            <p>{post.name}</p>
            <p>{post.description}</p>
            <p>{post.howtoeat}</p>
            <p>{post.plscread}</p>
          </div>
        </div>
      </div>
    );
  }
  else {
    //getSpeech("바코드" + pid + post.name + post.description);
    return (
      <div>
        <ReactAudioPlayer
          src="my_audio_file.ogg"
          autoPlay
          controls
        />
        <div>
          <p>❓ 바코드: {pid}</p>
          <div>
            <p>{post.name}</p>
            <p>{post.description}</p>
            
          </div>
        </div>
      </div>
    );
  }
};

export default Post;
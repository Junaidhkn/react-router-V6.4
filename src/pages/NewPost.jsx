import { redirect, useNavigate } from 'react-router-dom';

import NewPostForm from '../components/NewPostForm';
import { savePost } from '../util/api';

function NewPostPage () {

  const [error, setError] = useState();
  const navigate = useNavigate();



  function cancelHandler () {
    navigate( '/blog' );
  }

  return (
    <>
      <NewPostForm
        onCancel={cancelHandler}
        submitting={isSubmitting}
      />
    </>
  );
}

export default NewPostPage;


export async function action ( { request } ) {
  const formData = await request.formData()
  const post = {
    title: formData.get( 'title' ),
    body: formData.get( 'post-text' )
  }
  try {
    await savePost( post )

  } catch ( error ) {
    if ( error.status === 422 ) {
      // TBD
    }
    throw error
  }
  return redirect( '/blog' )
}
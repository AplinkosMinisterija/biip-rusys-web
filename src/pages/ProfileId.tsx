import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ProfileId = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    cookies.set('profileId', `${id}`, {
      path: '/',
      expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 30),
    });
    navigate('/');
  }, [navigate, id]);

  return null;
};

export default ProfileId;

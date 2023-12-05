import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { slugs } from '../utils/routes';

const RedirectToForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ pathname: slugs.newForm, search: `?species=${id}` });
  }, [id, navigate]);

  return <>dsadsa</>;
};

export default RedirectToForm;

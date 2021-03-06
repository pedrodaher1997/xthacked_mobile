import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';

import {Types as PostTypes} from '../../store/post/actions';
import api from '../../services/api';

import {
  Container,
  Content,
  Logo,
  VideoList,
  Filters,
  Filter,
  FilterText,
} from './styles';

import Item from '../../components/Item';
import Loading from '../../components/Loading';
import logomarca from '../../assets/logomarca-branca-mini.png';

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('course');
  const posts = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      const {data} = await api.get(`/posts/?type=${category}`);
      const posts = data;
      dispatch({type: PostTypes.ADD_POSTS, posts});
      setLoading(false);
    };

    search();
  }, [category, dispatch]);

  const handleCategory = category => {
    setCategory(category);
  };

  return (
    <>
      {loading && <Loading />}
      <Content colors={['#24a8df', '#02528e']}>
        <Container>
          <Logo source={logomarca} />

          <Filters>
            <Filter onPress={() => handleCategory('course')}>
              {category == 'course' ? (
                <AntDesign
                  name={'checkcircle'}
                  size={20}
                  color={'#24D540'}
                  solid
                />
              ) : (
                <AntDesign
                  name={'checkcircleo'}
                  size={20}
                  color={'#C8C8C8'}
                  solid
                />
              )}
              <FilterText>Cursos</FilterText>
            </Filter>
            <Filter onPress={() => handleCategory('question')}>
              {category == 'question' ? (
                <AntDesign
                  name={'checkcircle'}
                  size={20}
                  color={'#24D540'}
                  solid
                />
              ) : (
                <AntDesign
                  name={'checkcircleo'}
                  size={20}
                  color={'#C8C8C8'}
                  solid
                />
              )}
              <FilterText>Dúvidas</FilterText>
            </Filter>
            <Filter onPress={() => navigation.navigate('Submit')}>
              <AntDesign name={'plus'} size={20} color={'#C8C8C8'} solid />
              <FilterText>Enviar</FilterText>
            </Filter>
          </Filters>
          {posts.length == 0 ? (
            <Filter>
              <FilterText>Nenhum conteudo encontrado</FilterText>
            </Filter>
          ) : (
            <VideoList
              data={posts}
              horizontal={false}
              bounces={false}
              showsVerticalScrollIndicator={false}
              renderItem={item => (
                <Item post={item.item} navigation={navigation} />
              )}
              keyExtractor={post => post.id.toString()}
            />
          )}
        </Container>
      </Content>
    </>
  );
};

export default Home;

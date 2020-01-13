import actions from "../actions";

const INITIAL_BLOG_STATE = {
  currentIndex : 0,
  count : [0,0,0,0,0,0,0],
  view_more:false,
  tab : [
    {
      key:0,
      name:'View All',
    },
    {
      key:1,
      name:'Category 1',
    },
    {
      key:2,
      name:'Category 2',
    },
    {
      key:3,
      name:'Category 3',
    },
    {
      key:4,
      name:'Category 4',
    },
    {
      key:5,
      name:'Category 5',
    },
    {
      key:6,
      name:'Category 6',
    },
  ],
  BlogData : [
    {
      id:0,
      category:"Category 1",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:1,
      category:"Category 1",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:2,
      category:"Category 2",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:3,
      category:"Category 3",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:4,
      category:"Category 4",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:5,
      category:"Category 5",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:0,
      category:"Category 1",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:1,
      category:"Category 1",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:1,
      category:"Category 1",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:1,
      category:"Category 1",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:1,
      category:"Category 1",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:1,
      category:"Category 1",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:6,
      category:"Category 6",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    },
    {
      id:4,
      category:"Category 4",
      title:'Title of the Blog Post',
      description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
      postedAt:'12-12-2019',
      writtenBy:'By Anjana Premchand',
    }
  ],
  data : []
}

export const BlogReducers = (state = INITIAL_BLOG_STATE, action) => {
  switch (action.type) {

    case 'HANDLE_CURRENT_INDEX':
      console.log(action);
      let spliced_array,view_more = false,countIndex = state.count,detectCount = 0;
      if(action.blog.currentIndex === 0)
      {
        let count = state.count[0];
        detectCount = count;
        console.log("new_data",count);
        if(count === 0 || action.blog.toggle)
        {
          spliced_array = state.BlogData.slice(0,count === 0 ? 5 : count+4);
          console.log("new_data",spliced_array);
          view_more = spliced_array.length < state.BlogData.length ? true : false;

          countIndex[0] = spliced_array.length;
        }
        else {
          spliced_array = state.BlogData.slice(0,count);
          view_more = spliced_array.length < state.BlogData.length ? true : false;
        }
      }
      else {
        let count = state.count[action.blog.currentIndex];
        detectCount = count;
        let filtered_data = state.BlogData.filter( data => data.category == state.tab[action.blog.currentIndex].name);
        if(count === 0 || action.blog.toggle)
        {
          spliced_array = filtered_data.slice(0,count === 0 ? 5 : count+4);
          view_more = spliced_array.length < filtered_data.length ? true : false;
          countIndex[action.blog.currentIndex] = spliced_array.length;
        }
        else {
          spliced_array = filtered_data.slice(0,count);
          view_more = spliced_array.length < filtered_data.length ? true : false;
        }
      }

      console.log("new_data",spliced_array,countIndex,view_more,detectCount);

      return {
        ...state,
        data : spliced_array,
        view_more : view_more,
        count : countIndex,
        currentIndex : action.blog.currentIndex
      };


    default:
      return state
  }
}

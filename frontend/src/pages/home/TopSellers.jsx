import  { useState } from 'react'
import BookCard from '../books/BookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination,Navigation } from 'swiper/modules';


import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ["choose a genre","Fiction", "Horror","Business","Adventure"];

const TopSellers = () => {

    // const [books, setBooks] = useState([]); replaced by RTK query
    // useEffect(() => {
    //     fetch('books.json')
    //         .then(response => response.json())
    //         .then(data => setBooks(data))
    //         .catch(error => console.error('Error fetching top sellers:', error));
    // }, []); replaced by RTK query

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    
    const {data: books = []} = useFetchAllBooksQuery();

    const filteredBooks = selectedCategory === categories[0] ? books : books.filter(book => book.category === selectedCategory.toLowerCase());

  return (
    <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
            {/* category filtering */}
            <div className='mb-8 flex items-center'>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={50}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

                {
                   filteredBooks.length > 0 && filteredBooks.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard  book={book} />
                        </SwiperSlide>
                    ))
                }



            </Swiper>

            
    </div>
  )
}

export default TopSellers
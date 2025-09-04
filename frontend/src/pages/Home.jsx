import { motion } from 'framer-motion';
import Trailer from '../components/Trailer';
import NowShowing from '../components/NowShowing';
import Hero from '../components/Hero';

const Home = () => {

    return (
        <motion.div
            // First time page load animation (Up-to-Down)
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >

            {/* Hero Section */}
            <Hero />

            {/* Trailler section */}
            <Trailer />


            {/* Now Showing Section */}
            <NowShowing />


        </motion.div >
    );
};

export default Home;

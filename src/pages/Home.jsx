import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';
import { products, categories, testimonials } from '../data/products';

export default function Home() {
  const featuredProducts = products.filter(p => p.badge).slice(0, 8);
  const shopCategories = categories.filter(c => c.id !== 'all');

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                        bg-gradient-radial from-neon-green/5 to-transparent rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/20
                         rounded-full px-4 py-1.5 mb-6"
              >
                <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                <span className="text-neon-green text-sm font-medium">100% Organic & Natural</span>
              </motion.div>

              <h1 className="font-outfit text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
                <span className="text-brand-900">Nature's</span>
                <br />
                <span className="gradient-text">Finest</span>
                <br />
                <span className="text-brand-900">Wellness</span>
              </h1>

              <p className="text-brand-200 text-lg max-w-lg mb-8 leading-relaxed">
                Discover premium organic products crafted from the purest ingredients nature
                has to offer. From raw forest honey to herbal supplements — elevate your
                wellness journey.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                  Shop Now
                  <FiArrowRight />
                </Link>
                <Link to="/shop?category=honey" className="btn-outline flex items-center gap-2 px-8 py-4">
                  Explore Honey
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-brand-100/40">
                {[
                  { value: '50K+', label: 'Happy Customers' },
                  { value: '200+', label: 'Products' },
                  { value: '4.9', label: 'Avg Rating', icon: <FiStar className="inline text-amber-400" size={14} /> },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-outfit font-bold text-2xl text-neon-green">
                      {stat.value} {stat.icon}
                    </p>
                    <p className="text-brand-200 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-96 h-96">
                {/* Glowing ring */}
                <div className="absolute inset-0 rounded-full border-2 border-neon-green/15 animate-spin-slow" />
                <div className="absolute inset-4 rounded-full border border-neon-green/10 animate-spin-slow"
                     style={{ animationDirection: 'reverse' }} />

                {/* Center element */}
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-neon-green/10 to-neon-cyan/5
                              flex items-center justify-center animate-float border border-neon-green/15 shadow-glass">
                  <span className="text-8xl">🌿</span>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-8 right-8 glass-card p-3 rounded-xl"
                >
                  <span className="text-3xl">🍯</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-16 left-4 glass-card p-3 rounded-xl"
                >
                  <span className="text-3xl">💊</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute bottom-8 right-16 glass-card p-3 rounded-xl"
                >
                  <span className="text-3xl">🍵</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="relative py-12 border-y border-brand-100/30 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FiTruck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: FiShield, title: 'Secure Payment', desc: '100% protected' },
              { icon: FiRefreshCw, title: 'Easy Returns', desc: '30-day guarantee' },
              { icon: () => <span className="text-neon-green text-lg">🌿</span>, title: '100% Organic', desc: 'Certified natural' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-neon-green/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="text-neon-green" size={22} />
                </div>
                <div>
                  <p className="font-outfit font-semibold text-sm text-brand-900">{feature.title}</p>
                  <p className="text-brand-200 text-xs">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              Shop by <span className="gradient-text">Category</span>
            </h2>
            <p className="section-subtitle">
              Explore our curated collections of premium organic and pharmacy products
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {shopCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/shop?category=${cat.id}`}
                  className="glass-card-hover p-6 flex flex-col items-center gap-3 text-center group"
                >
                  <span className="text-4xl group-hover:scale-125 transition-transform duration-500">
                    {cat.icon}
                  </span>
                  <span className="font-outfit font-medium text-sm text-brand-700 group-hover:text-neon-green transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between mb-12"
          >
            <div>
              <h2 className="section-title text-left mb-2">
                Featured <span className="gradient-text">Products</span>
              </h2>
              <p className="text-brand-200 text-lg">Hand-picked favorites from our collection</p>
            </div>
            <Link
              to="/shop"
              className="btn-outline flex items-center gap-2 mt-4 md:mt-0"
            >
              View All <FiArrowRight />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl shadow-card-hover"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-green/90 to-neon-cyan/80" />
            <div className="relative z-10 p-8 md:p-16 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-white/80 text-sm font-bold uppercase tracking-widest">Limited Offer</span>
                <h3 className="font-outfit text-4xl md:text-5xl font-black mt-3 mb-4 text-white">
                  Get <span className="text-yellow-200">30% Off</span>
                  <br />Your First Order
                </h3>
                <p className="text-white/80 mb-6">
                  Use code <span className="text-white font-mono font-bold bg-white/20 px-2 py-0.5 rounded">ETHOS30</span> at checkout.
                  Valid for new customers only.
                </p>
                <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-neon-green font-semibold
                                           px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Shop Now <FiArrowRight />
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-9xl animate-float">🌱</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              What Our <span className="gradient-text">Customers</span> Say
            </h2>
            <p className="section-subtitle">
              Real stories from real people who love Ethos Botanica
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 hover:border-neon-green/30 hover:shadow-card-hover transition-all duration-500"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, s) => (
                    <FiStar key={s} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-brand-700 text-sm leading-relaxed mb-6">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-neon-lime
                                flex items-center justify-center text-white font-bold text-xs">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-outfit font-semibold text-sm text-brand-900">{t.name}</p>
                    <p className="text-brand-200 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

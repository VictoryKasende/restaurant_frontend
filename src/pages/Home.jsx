import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  // Plats dynamiques
  const [plats, setPlats] = useState([]);
  const [loadingPlats, setLoadingPlats] = useState(true);
  const [errorPlats, setErrorPlats] = useState(null);

  // Avis dynamiques
  const [avis, setAvis] = useState([]);
  const [loadingAvis, setLoadingAvis] = useState(true);
  const [errorAvis, setErrorAvis] = useState(null);

  // Panier
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [orderError, setOrderError] = useState(null);

  // Avis : gestion modale et soumission
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewPlat, setReviewPlat] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(null);

  const { user, handleLogout } = useAuth();
  const navigate = typeof useNavigate !== 'undefined' ? useNavigate() : null;

  // Fonction pour charger les avis
  const fetchAvis = () => {
    api.get('avis/')
      .then(res => setAvis(res.data))
      .catch(() => setErrorAvis('Erreur lors du chargement des avis.'))
      .finally(() => setLoadingAvis(false));
  };

  useEffect(() => {
    // Récupérer les plats
    api.get('plats/')
      .then(res => setPlats(res.data))
      .catch(() => setErrorPlats('Erreur lors du chargement du menu.'))
      .finally(() => setLoadingPlats(false));
    // Récupérer les avis
    fetchAvis();
  }, []);

  // Ajouter un plat au panier
  const addToCart = (plat) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === plat.id);
      if (found) {
        return prev.map((item) => item.id === plat.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...plat, quantity: 1 }];
    });
  };

  // Retirer un plat du panier
  const removeFromCart = (platId) => {
    setCart((prev) => prev.filter((item) => item.id !== platId));
  };

  // Changer la quantité
  const changeQuantity = (platId, qty) => {
    setCart((prev) => prev.map((item) => item.id === platId ? { ...item, quantity: Math.max(1, qty) } : item));
  };

  // Passer la commande (POST /commandes/)
  const handleOrder = async () => {
    if (!user) {
      alert('Vous devez être connecté pour commander.');
      if (navigate) navigate('/login');
      return;
    }
    if (user.role !== 'client') {
      setOrderError('Seuls les clients peuvent passer une commande.');
      return;
    }
    setOrderLoading(true);
    setOrderError(null);
    setOrderSuccess(null);
    try {
      await api.post('commandes/', {
        statut: 'en_attente',
        lignes: cart.map(item => ({ plat_id: item.id, quantite: item.quantity })),
      });
      setOrderSuccess('Commande passée avec succès !');
      setCart([]);
    } catch (e) {
      setOrderError("Erreur lors de la commande. Veuillez réessayer.");
    } finally {
      setOrderLoading(false);
    }
  };

  // Ouvrir la modale d'avis
  const openReviewModal = (plat) => {
    setReviewPlat(plat);
    setReviewRating(0);
    setReviewComment('');
    setReviewName('');
    setReviewError(null);
    setReviewSuccess(null);
    setShowReviewModal(true);
  };

  // Soumettre un avis (POST /avis/)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Vous devez être connecté pour laisser un avis.');
      if (navigate) navigate('/login');
      return;
    }
    if (user.role !== 'client') {
      setReviewError('Seuls les clients peuvent laisser un avis.');
      return;
    }
    setReviewLoading(true);
    setReviewError(null);
    setReviewSuccess(null);
    try {
      await api.post('avis/', {
        commande: reviewPlat.id, // À adapter si ce n'est pas l'id de la commande mais du plat
        texte: reviewComment,
      });
      setReviewSuccess('Merci pour votre avis !');
      setReviewComment('');
      setReviewRating(0);
      setReviewName('');
      fetchAvis(); // Recharge les avis après ajout
    } catch (err) {
      setReviewError("Erreur lors de l'envoi de l'avis. Veuillez réessayer.");
    } finally {
      setReviewLoading(false);
    }
  };

  // Utilitaire pour formater la date ISO en format lisible
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
      ' ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Navbar fixe en haut */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-utensils text-2xl text-pink-600"></i>
            <span className="title-font text-2xl font-bold text-gray-800">GastroManager</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="/" className="hover:text-pink-600 font-medium">Accueil</a>
            <a href="/menu" className="hover:text-pink-600 font-medium">Menu</a>
            {user ? (
              <>
                <span className="font-medium text-gray-700">{user.first_name || user.username}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    if (typeof navigate === 'function') navigate('/');
                  }}
                  className="hover:text-pink-600 font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <a href="/login" className="hover:text-pink-600 font-medium">Connexion</a>
            )}
          </div>
          <div className="relative">
            <button id="cartButton" className="text-gray-700 hover:text-pink-600 p-2 relative" onClick={() => setShowCart(true)}>
              <i className="fas fa-shopping-cart text-xl"></i>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* Décale le contenu principal sous la navbar */}
      <div className="pt-20">
        {/* Hero Section */}
        <header className="gradient-bg text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="title-font text-4xl md:text-5xl font-bold mb-4">Découvrez l'art culinaire français</h1>
            <p className="text-xl mb-8">Une expérience gastronomique inoubliable</p>
            <a href="#menu" className="btn-primary inline-flex items-center px-6 py-3 border border-transparent rounded-lg font-medium text-white">
              Voir le menu <i className="fas fa-arrow-down ml-2"></i>
            </a>
          </div>
        </header>

        {/* Menu Section */}
        <section id="menu" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="title-font text-3xl font-bold text-center mb-12">Notre Menu</h2>
            {loadingPlats ? (
              <div className="text-center text-gray-500">Chargement du menu...</div>
            ) : errorPlats ? (
              <div className="text-center text-red-500">{errorPlats}</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plats.map(plat => (
                  <div key={plat.id} className="card bg-white rounded-lg overflow-hidden">
                    <img src={plat.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} alt={plat.nom} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="title-font text-xl font-bold">{plat.nom}</h3>
                        <span className="text-primary font-bold">{plat.prix ? plat.prix.toFixed(2) : '0.00'}€</span>
                      </div>
                      <p className="text-gray-600 mt-2">{plat.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <button className="add-to-cart btn-primary px-4 py-2 rounded-lg text-sm text-white" onClick={() => addToCart(plat)}>
                          <i className="fas fa-cart-plus mr-1"></i> Ajouter
                        </button>
                        {/* Bouton Avis */}
                        <button className="show-review-form text-gray-500 hover:text-primary px-3 py-1 text-sm" onClick={() => openReviewModal(plat)}>
                          <i className="fas fa-comment-alt mr-1"></i> Avis
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
          </div>
        </section>
        {/* Modal Panier */}
        {showCart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={() => setShowCart(false)}>
                <i className="fas fa-times"></i>
              </button>
              <h3 className="title-font text-lg font-bold mb-4 flex items-center"><i className="fas fa-shopping-cart mr-2"></i> Votre Panier</h3>
              {cart.length === 0 ? (
                <div className="text-gray-500 text-center py-4">Votre panier est vide</div>
              ) : (
                <div>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center border-b border-gray-100 py-2">
                      <div>
                        <h4 className="font-medium">{item.nom}</h4>
                        <p className="text-sm text-gray-500">{item.prix ? item.prix.toFixed(2) : '0.00'}€ x {item.quantity}</p>
                      </div>
                      <div className="flex items-center">
                        <input type="number" min="1" value={item.quantity} onChange={e => changeQuantity(item.id, parseInt(e.target.value))} className="w-16 border rounded px-2 py-1 mr-2" />
                        <span className="font-medium mr-4">{(item.prix * item.quantity).toFixed(2)}€</span>
                        <button className="text-red-500 hover:text-red-700" onClick={() => removeFromCart(item.id)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-primary">{cart.reduce((t, i) => t + i.prix * i.quantity, 0).toFixed(2)}€</span>
                  </div>
                  {orderError && <div className="text-red-500 text-sm mt-2">{orderError}</div>}
                  {orderSuccess && <div className="text-green-600 text-sm mt-2">{orderSuccess}</div>}
                  <button className="btn-primary w-full mt-4 py-3 rounded-lg text-white font-medium flex items-center justify-center" onClick={handleOrder} disabled={orderLoading || !user || user.role !== 'client'}>
                    <i className="fas fa-credit-card mr-2"></i> {orderLoading ? 'Commande...' : 'Commander'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Avis Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="title-font text-3xl font-bold text-center mb-12">Avis des Clients</h2>
            {loadingAvis ? (
              <div className="text-center text-gray-500">Chargement des avis...</div>
            ) : errorAvis ? (
              <div className="text-center text-red-500">{errorAvis}</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {avis.map(a => (
                  <div key={a.id} className="card bg-white p-6">
                    <div className="flex items-center mb-3">
                      <div className="gradient-bg text-white p-2 rounded-full">
                        <i className="fas fa-user text-sm"></i>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-bold">{a.client_username || a.client || 'Anonyme'}</h4>
                        <p className="text-xs text-gray-500">{formatDate(a.date || a.date_commande)}</p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex mt-1">
                        {[1,2,3,4,5].map(i => (
                          <i key={i} className={`fas fa-star ${i <= (a.note || 0) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mt-2">{a.texte || a.commentaire || ''}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* À propos Section */}
        <section id="about" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <h2 className="title-font text-3xl font-bold mb-6">Notre Histoire</h2>
                <p className="text-gray-600 mb-4">Fondé en 1985, Le Gourmet Français est rapidement devenu une référence de la cuisine traditionnelle française à Paris.</p>
                <p className="text-gray-600 mb-4">Notre chef, Jean-Luc Dubois, formé auprès des plus grands noms de la gastronomie française, apporte son savoir-faire et sa passion dans chaque plat.</p>
                <p className="text-gray-600">Nous nous engageons à utiliser des produits locaux et de saison pour offrir une expérience authentique et responsable.</p>
              </div>
              <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-12">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Notre restaurant" className="rounded-lg shadow-lg w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="title-font text-3xl font-bold text-center mb-12">Contactez-nous</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="title-font text-xl font-bold mb-4">Informations</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-primary mt-1 mr-3"></i>
                    <p>12 Rue de la Gastronomie, 75008 Paris</p>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-phone-alt text-primary mt-1 mr-3"></i>
                    <p>+33 1 23 45 67 89</p>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-envelope text-primary mt-1 mr-3"></i>
                    <p>contact@gourmetfrancais.com</p>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-clock text-primary mt-1 mr-3"></i>
                    <p>Lundi - Vendredi: 11h30 - 14h30 / 19h - 22h<br />Samedi - Dimanche: 12h - 23h</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="title-font text-xl font-bold mb-4">Formulaire de contact</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea id="message" name="message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"></textarea>
                  </div>
                  <button type="submit" className="btn-primary px-6 py-3 rounded-lg text-white font-medium">
                    Envoyer <i className="fas fa-paper-plane ml-2"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:justify-between md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="gradient-bg text-white p-2 rounded-lg">
                  <i className="fas fa-utensils"></i>
                </div>
                <span className="title-font text-xl font-bold ml-2">Le Gourmet Français</span>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-tripadvisor"></i>
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
              <p>&copy; 2023 Le Gourmet Français. Tous droits réservés.</p>
            </div>
          </div>
        </footer>

        {/* Modale d'avis */}
        {showReviewModal && reviewPlat && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={() => setShowReviewModal(false)}>
                <i className="fas fa-times"></i>
              </button>
              <h3 className="title-font text-lg font-bold mb-4">Donnez votre avis sur {reviewPlat.nom}</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                  <div className="flex space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <i key={i} className={`fas fa-star text-2xl cursor-pointer ${i <= reviewRating ? 'text-yellow-400' : 'text-gray-300'}`} onClick={() => setReviewRating(i)}></i>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700 mb-2">Commentaire</label>
                  <textarea id="reviewComment" rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" value={reviewComment} onChange={e => setReviewComment(e.target.value)} required></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="reviewName" className="block text-sm font-medium text-gray-700 mb-2">Votre nom (optionnel)</label>
                  <input type="text" id="reviewName" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" value={reviewName} onChange={e => setReviewName(e.target.value)} />
                </div>
                {reviewError && <div className="text-red-500 text-sm mb-2">{reviewError}</div>}
                {reviewSuccess && <div className="text-green-600 text-sm mb-2">{reviewSuccess}</div>}
                <button type="submit" className="btn-primary w-full py-3 rounded-lg text-white font-medium flex items-center justify-center" disabled={reviewLoading}>
                  <i className="fas fa-paper-plane mr-2"></i> {reviewLoading ? "Envoi..." : "Envoyer l'avis"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

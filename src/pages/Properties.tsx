import React, { useState } from 'react';
import { Search, Filter, MapPin, Grid, List } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types';

const Properties = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  // Mock properties data
  const properties: Property[] = [
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      description: 'Luxurious 2-bedroom apartment in the heart of downtown with stunning city views',
      price: 350000,
      type: 'sale',
      category: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      location: {
        address: '123 Main Street',
        lat: 40.7128,
        lng: -74.0060,
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      },
      images: ['https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg'],
      features: ['Gym', 'Pool', 'Parking', 'Balcony'],
      agentId: 'agent1',
      agentName: 'Sarah Johnson',
      agentContact: 'sarah@realestate.com',
      inspectionFee: 50,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Family House with Garden',
      description: 'Beautiful 4-bedroom house perfect for families with a large backyard',
      price: 2500,
      type: 'rent',
      category: 'house',
      bedrooms: 4,
      bathrooms: 3,
      area: 2000,
      location: {
        address: '456 Oak Avenue',
        lat: 40.7580,
        lng: -73.9855,
        city: 'New York',
        state: 'NY',
        zipCode: '10023'
      },
      images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
      features: ['Garden', 'Garage', 'Fireplace', 'Patio'],
      agentId: 'agent2',
      agentName: 'Mike Davis',
      agentContact: 'mike@realestate.com',
      inspectionFee: 75,
      createdAt: '2024-01-16',
      updatedAt: '2024-01-16'
    },
    {
      id: '3',
      title: 'Luxury Penthouse Suite',
      description: 'Exclusive penthouse with panoramic city views and premium amenities',
      price: 850000,
      type: 'sale',
      category: 'apartment',
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      location: {
        address: '789 Park Plaza',
        lat: 40.7589,
        lng: -73.9851,
        city: 'New York',
        state: 'NY',
        zipCode: '10024'
      },
      images: ['https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg'],
      features: ['City View', 'Balcony', 'Concierge', 'Rooftop Access'],
      agentId: 'agent3',
      agentName: 'Emily Chen',
      agentContact: 'emily@realestate.com',
      inspectionFee: 100,
      createdAt: '2024-01-17',
      updatedAt: '2024-01-17'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Properties</h1>
          <p className="text-gray-600">Discover your perfect property from our extensive collection</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
            </select>

            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Bedrooms</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>

            <select
              value={filters.bathrooms}
              onChange={(e) => setFilters(prev => ({ ...prev, bathrooms: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Bathrooms</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {properties.length} properties
          </p>
        </div>

        {/* Properties Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
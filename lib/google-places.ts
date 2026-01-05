const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAb9_qu6cTBQSNZkXNVNEhmhEQIrl_f5tY'
const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place'

export interface GooglePlaceResult {
  found: boolean
  place_id?: string
  name?: string
  formatted_address?: string
  rating?: number
  user_ratings_total?: number
  photos?: Array<{ photo_reference: string }>
  business_status?: string
  completeness_score: number
  reviews_present: boolean
  photos_present: boolean
}

/**
 * Search for a business on Google Places
 */
export async function searchGooglePlace(
  businessName: string,
  location: string
): Promise<GooglePlaceResult> {
  if (!GOOGLE_PLACES_API_KEY) {
    console.warn('Google Places API key not configured')
    return {
      found: false,
      completeness_score: 0,
      reviews_present: false,
      photos_present: false,
    }
  }

  try {
    // Step 1: Text Search to find the place
    const searchQuery = `${businessName} ${location}`
    const searchUrl = `${GOOGLE_PLACES_BASE_URL}/textsearch/json?query=${encodeURIComponent(
      searchQuery
    )}&key=${GOOGLE_PLACES_API_KEY}`

    const searchResponse = await fetch(searchUrl)
    if (!searchResponse.ok) {
      console.error('Google Places search failed:', searchResponse.status)
      return {
        found: false,
        completeness_score: 0,
        reviews_present: false,
        photos_present: false,
      }
    }

    const searchData = await searchResponse.json()

    if (searchData.status !== 'OK' || !searchData.results || searchData.results.length === 0) {
      return {
        found: false,
        completeness_score: 0,
        reviews_present: false,
        photos_present: false,
      }
    }

    // Get the first result (most relevant)
    const place = searchData.results[0]

    // Step 2: Get detailed place information
    const detailsUrl = `${GOOGLE_PLACES_BASE_URL}/details/json?place_id=${place.place_id}&fields=name,formatted_address,rating,user_ratings_total,photos,business_status,reviews&key=${GOOGLE_PLACES_API_KEY}`

    const detailsResponse = await fetch(detailsUrl)
    let placeDetails = place // Default to search result if details fail

    if (detailsResponse.ok) {
      const detailsData = await detailsResponse.json()
      if (detailsData.status === 'OK' && detailsData.result) {
        placeDetails = { ...place, ...detailsData.result }
      }
    }

    // Calculate completeness score
    let completenessScore = 0
    if (placeDetails.name) completenessScore += 20
    if (placeDetails.formatted_address) completenessScore += 20
    if (placeDetails.rating) completenessScore += 20
    if (placeDetails.user_ratings_total && placeDetails.user_ratings_total > 0)
      completenessScore += 20
    if (placeDetails.photos && placeDetails.photos.length > 0) completenessScore += 20

    return {
      found: true,
      place_id: place.place_id,
      name: placeDetails.name,
      formatted_address: placeDetails.formatted_address,
      rating: placeDetails.rating,
      user_ratings_total: placeDetails.user_ratings_total,
      photos: placeDetails.photos,
      business_status: placeDetails.business_status,
      completeness_score: completenessScore,
      reviews_present: !!(placeDetails.user_ratings_total && placeDetails.user_ratings_total > 0),
      photos_present: !!(placeDetails.photos && placeDetails.photos.length > 0),
    }
  } catch (error) {
    console.error('Error searching Google Places:', error)
    return {
      found: false,
      completeness_score: 0,
      reviews_present: false,
      photos_present: false,
    }
  }
}


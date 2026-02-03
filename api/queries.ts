import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

/**
 * Apollo Client Setup
 */

export const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    "http://localhost:3000/api/graphql",
  fetch: function (uri, options) {
    return fetch(uri, {
      ...options,
      next: {
        revalidate: 60,
      },
    }).catch((error) => {
      console.error("Network fetch error:", error);
      // Redirect to error page on network failure
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        
        // Prevent redirect loop - don't redirect if already on error page
        if (pathname.includes("somethingwentwrong")) {
          throw error;
        }
        
        // Redirect to main domain's error page (remove subdomain)
        const hostname = window.location.hostname;
        const port = window.location.port;
        const protocol = window.location.protocol;
        
        // Extract base domain (remove subdomain)
        const parts = hostname.split(".");
        const baseDomain = parts.length > 1 ? parts.slice(1).join(".") : hostname;
        
        window.location.href = `${protocol}//${baseDomain}${port ? `:${port}` : ""}/somethingwentwrong`;
      }
      throw error;
    });
  },
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    // Redirect to error page on network error
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      
      // Prevent redirect loop - don't redirect if already on error page
      if (pathname.includes("somethingwentwrong")) {
        return;
      }
      
      // Redirect to main domain's error page (remove subdomain)
      const hostname = window.location.hostname;
      const port = window.location.port;
      const protocol = window.location.protocol;
      
      // Extract base domain (remove subdomain)
      const parts = hostname.split(".");
      const baseDomain = parts.length > 1 ? parts.slice(1).join(".") : hostname;
      
      window.location.href = `${protocol}//${baseDomain}${port ? `:${port}` : ""}/somethingwentwrong`;
    }
  }
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache({}),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
  },
});

/**
 * Type Definitions
 */

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain: string;
  menu?: {
    url: string;
    filename: string;
  };
  logo?: {
    url: string;
  };
  address?: string;
  phone?: string;
  email?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: {
    url: string;
    filename: string;
  };
  shortAboutTitle?: string;
  shortAboutText?: string;
  newMenu?: Array<{
    src?: {
      url: string;
      filename: string;
    };
    id?: string;
  }>;
}

export interface HomeInformation {
  CatchPhrase1: string;
  CatchPhrase2: string;
  quote_s_: Array<{ quote: string; id: string }>;
}

export interface GalleryItem {
  id: string;
  image?: {
    url: string;
    filename: string;
    alt?: string;
  };
  caption?: string;
  branch?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface TenantsResponse {
  Tenants: {
    docs: Tenant[];
    totalDocs: number;
    limit: number;
  };
}

interface TenantResponse {
  Tenants: {
    docs: Tenant[];
  };
}

interface HomeInformationResponse {
  HomeInformation: HomeInformation;
}

interface GalleryResponse {
  Galleries: {
    docs: GalleryItem[];
    totalDocs: number;
  };
}

interface CustomerResponse {
  Customers: {
    docs: Array<{
      id: string;
      customerName: string;
      customerPhone: string;
    }>;
  };
}

/**
 * QUERIES
 */

const GET_TENANTS = gql`
  query getTenants($limit: Int = 100) {
    Tenants(limit: $limit) {
      docs {
        id
        name
        slug
        domain
        menu {
          url
          filename
        }
        logo {
          url
        }
        address
        phone
        email
        heroTitle
        heroSubtitle
        heroDescription
        heroImage {
          url
          filename
        }
        shortAboutTitle
        shortAboutText
        newMenu {
          src {
            url
            filename
          }
          id
        }
      }
      totalDocs
      limit
    }
  }
`;

const GET_TENANT = gql`
  query getTenant($slug: String) {
    Tenants(where: { slug: { equals: $slug } }) {
      docs {
        id
        name
        slug
        domain
        menu {
          url
          filename
        }
        logo {
          url
        }
        address
        phone
        email
        heroTitle
        heroSubtitle
        heroDescription
        heroImage {
          url
          filename
        }
        shortAboutTitle
        shortAboutText
        newMenu {
          src {
            url
            filename
          }
          id
        }
      }
    }
  }
`;

const GET_HOME_INFORMATION = gql`
  query getHomeInformation {
    HomeInformation {
      CatchPhrase1
      CatchPhrase2
      quote_s_ {
        quote
        id
      }
    }
  }
`;

const GET_GALLERY = gql`
  query getGallery {
    Galleries(limit: 100) {
      docs {
        id
        image {
          url
          filename
          alt
        }
        caption
        branch {
          id
          name
          slug
        }
      }
      totalDocs
    }
  }
`;

const GET_CUSTOMER = gql`
  query getCustomer($customerPhone: String) {
    Customers(where: { customerPhone: { equals: $customerPhone } }) {
      docs {
        id
        customerName
        customerPhone
      }
    }
  }
`;

/**
 * MUTATIONS
 */

const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($customerName: String!, $customerPhone: String!) {
    createCustomer(
      data: { customerName: $customerName, customerPhone: $customerPhone }
    ) {
      id
      customerName
      customerPhone
    }
  }
`;

const CREATE_RESERVATION = gql`
  mutation CreateReservation(
    $customer: String!
    $reservationDateTime: String!
    $numberOfGuests: Float!
    $specialRequests: String
    $branch: String!
    $status: Reservation_status_MutationInput!
  ) {
    createReservation(
      data: {
        customer: $customer
        reservationDateTime: $reservationDateTime
        numberOfGuests: $numberOfGuests
        specialRequests: $specialRequests
        branch: $branch
        status: $status
      }
    ) {
      id
      reservationDateTime
      numberOfGuests
    }
  }
`;

const CREATE_CONTACT_MESSAGE = gql`
  mutation CreateContactMessage(
    $customer: String!
    $message: String
    $branch: String!
    $status: ContactMessage_status_MutationInput!
  ) {
    createContactMessage(
      data: {
        customer: $customer
        message: $message
        branch: $branch
        status: $status
      }
    ) {
      id
      customer {
        id
        customerName
        customerPhone
      }
      message
      branch {
        id
        name
      }
      status
    }
  }
`;

/**
 * Query Functions
 */

/**
 * Fetch all tenants from the API
 * @param limit - Maximum number of tenants to fetch
 * @returns Promise with tenants data
 */
export const fetchTenants = async (limit = 100) => {
  try {
    const { data } = await client.query<TenantsResponse>({
      query: GET_TENANTS,
      variables: { limit },
    });
    return data.Tenants?.docs || [];
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return [];
  }
};

/**
 * Fetch a single tenant by slug
 * @param slug - The tenant slug
 * @returns Promise with tenant data
 */
export const fetchTenantBySlug = async (slug: string) => {
  try {
    const { data } = await client.query<TenantResponse>({
      query: GET_TENANT,
      variables: { slug },
    });
    return data.Tenants?.docs?.[0] || null;
  } catch (error) {
    console.error("Error fetching tenant:", error);
    return null;
  }
};

/**
 * Fetch home information global settings
 * @returns Promise with home information data
 */
export const fetchHomeInformation = async () => {
  try {
    const { data } = await client.query<HomeInformationResponse>({
      query: GET_HOME_INFORMATION,
    });
    return data.HomeInformation;
  } catch (error) {
    console.error("Error fetching home information:", error);
    return null;
  }
};

/**
 * Fetch gallery images
 * @param branchId - Optional branch ID to filter by specific branch
 * @returns Promise with gallery items
 */
export const fetchGallery = async (branchId?: string) => {
  try {
    console.log("Fetching gallery with branchId:", branchId);
    const { data } = await client.query<GalleryResponse>({
      query: GET_GALLERY,
    });
    console.log("Gallery data received:", data);
    console.log("Gallery docs:", data.Galleries.docs);

    // Filter by branch on the client side if branchId is provided
    let docs = data.Galleries.docs;
    if (branchId && docs.length > 0) {
      docs = docs.filter((item) => item.branch?.id === branchId);
    }

    return docs;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
};

/* END OF QUERIES */

/**
 * Mutation Functions
 */

/**
 * Get customer by phone number
 * @param phone - Customer phone number
 * @returns Promise with customer data or null
 */
export const getCustomerByPhone = async (phone: string) => {
  try {
    const { data } = await client.query<CustomerResponse>({
      query: GET_CUSTOMER,
      variables: { customerPhone: phone },
    });
    return data.Customers?.docs?.[0] || null;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
};

/**
 * Create a new customer
 * @param name - Customer name
 * @param phone - Customer phone
 * @returns Promise with created customer data
 */
export const createCustomer = async (name: string, phone: string) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_CUSTOMER,
      variables: {
        customerName: name,
        customerPhone: phone,
      },
    });
    return data.createCustomer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

/**
 * Create a new reservation
 * @param customerId - Customer ID (from Customers collection)
 * @param reservationDateTime - ISO date-time string
 * @param numberOfGuests - Number of guests
 * @param specialRequests - Special requests/notes
 * @param branchId - Branch/Tenant ID
 * @returns Promise with created reservation data
 */
export const createReservation = async (
  customerId: string,
  reservationDateTime: string,
  numberOfGuests: number,
  specialRequests: string | undefined,
  branchId: string,
) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_RESERVATION,
      variables: {
        customer: customerId,
        reservationDateTime,
        numberOfGuests,
        specialRequests,
        branch: branchId,
        status: "Pending",
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

/**
 * Create a new contact message
 * @param customerId - Customer ID (from Customers collection)
 * @param message - Message content
 * @param branchId - Branch/Tenant ID
 * @returns Promise with created contact message data
 */
export const createContactMessage = async (
  customerId: string,
  message: string | undefined,
  branchId: string,
) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_CONTACT_MESSAGE,
      variables: {
        customer: customerId,
        message: message || "",
        branch: branchId,
        status: "Pending",
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating contact message:", error);
    throw error;
  }
};

/* END OF MUTATIONS */

/**
 * Export API URL for cases where it's needed (like image URLs)
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const cartKey = "auriva-elite-cart";
const whatsappNumber = "919050753534";

const productCards = Array.from(document.querySelectorAll(".product-card"));
const headerCartCount = document.getElementById("header-cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountElement = document.getElementById("cart-count");
const cartTotalElement = document.getElementById("cart-total");
const searchInput = document.getElementById("search-input");
const searchResultsText = document.getElementById("search-results-text");
const clearCartButton = document.getElementById("clear-cart-button");
const checkoutForm = document.getElementById("checkout-form");
const checkoutButton = document.getElementById("checkout-button");
const checkoutFeedback = document.getElementById("checkout-feedback");
const checkoutModal = document.getElementById("checkout-modal");
const checkoutModalCloseButton = document.getElementById("checkout-modal-close");
const toast = document.getElementById("toast");
const openCheckoutTriggers = Array.from(document.querySelectorAll("[data-open-checkout]"));
const profileButton = document.getElementById("profile-button");
const profileModal = document.getElementById("profile-modal");
const profileModalCloseButton = document.getElementById("profile-modal-close");
const profileForm = document.getElementById("profile-form");
const profileFeedback = document.getElementById("profile-feedback");
const profileEmail = document.getElementById("profile-email");
const profilePhone = document.getElementById("profile-phone");
const profileAddress = document.getElementById("profile-address");
const profileCity = document.getElementById("profile-city");
const profileState = document.getElementById("profile-state");
const profilePincode = document.getElementById("profile-pincode");
const profileNameInput = document.getElementById("profile-name");
const profilePhoneInput = document.getElementById("profile-phone-input");
const profileAddressInput = document.getElementById("profile-address-input");
const profileStateInput = document.getElementById("profile-state-input");
const profileCityInput = document.getElementById("profile-city-input");
const profilePincodeInput = document.getElementById("profile-pincode-input");
const profileLandmarkInput = document.getElementById("profile-landmark-input");
const profileStateOptions = document.getElementById("profile-state-options");
const profileCityOptions = document.getElementById("profile-city-options");

const modal = document.getElementById("product-modal");
const modalCloseButton = document.getElementById("product-modal-close");
const modalGrid = document.getElementById("product-modal-grid");
const modalGallery = document.getElementById("product-modal-gallery");
const modalBadge = document.getElementById("product-modal-badge");
const modalTitle = document.getElementById("product-modal-title");
const modalTagline = document.getElementById("product-modal-tagline");
const modalPrice = document.getElementById("product-modal-price");
const modalDescription = document.getElementById("product-modal-description");
const modalInfoBlock = document.getElementById("product-modal-info-block");
const modalInfo = document.getElementById("product-modal-info");
const modalIncludes = document.getElementById("product-modal-includes");
const modalHighlights = document.getElementById("product-modal-highlights");
const modalReviewText = document.getElementById("product-modal-review-text");
const modalCartButton = document.getElementById("product-modal-cart");
const modalAmazonLink = document.getElementById("product-modal-amazon");

const customerName = document.getElementById("customer-name");
const customerPhone = document.getElementById("customer-phone");
const customerAddress = document.getElementById("customer-address");
const customerState = document.getElementById("customer-state");
const customerCity = document.getElementById("customer-city");
const customerPincode = document.getElementById("customer-pincode");
const customerLandmark = document.getElementById("customer-landmark");
const customerNote = document.getElementById("customer-note");

const authToggleButton = document.getElementById("auth-toggle-button");
const authModal = document.getElementById("auth-modal");
const authModalCloseButton = document.getElementById("auth-modal-close");
const authStatus = document.getElementById("auth-status");
const authEmail = document.getElementById("auth-email");
const authCode = document.getElementById("auth-code");
const authSendButton = document.getElementById("auth-send-button");
const authVerifyButton = document.getElementById("auth-verify-button");
const authLogoutButton = document.getElementById("auth-logout-button");

const AUTH_API_BASE_URL = "https://auriva-elite-auth.auriva-elite-auth.workers.dev";
const AUTH_SESSION_KEY = "auriva-elite-auth-session";
const PROFILE_STORAGE_PREFIX = "auriva-elite-profile:";

let activeModalProductId = null;
let activeGalleryIndex = 0;
let toastTimer = null;
const lastPincodeLookupByScope = new Map();
let countryStateCityModule = null;
let authUser = null;
let authSessionToken = "";
const stateCodeByName = new Map();
const fullCityMap = new Map();

const stateCityMap = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kurnool", "Rajahmundry"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro"],
  Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur", "Nagaon"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia"],
  Chandigarh: ["Chandigarh"],
  Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Bhilai", "Korba", "Rajnandgaon"],
  Delhi: ["New Delhi", "Central Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Karnal", "Hisar", "Rohtak", "Sonipat", "Ambala", "Yamunanagar", "Bhiwani", "Sirsa", "Jhajjar", "Jind", "Kaithal", "Kurukshetra", "Rewari"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi", "Kullu"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Shivamogga"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kannur", "Kollam"],
  Ladakh: ["Leh", "Kargil"],
  Lakshadweep: ["Kavaratti"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Kolhapur"],
  Manipur: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
  Meghalaya: ["Shillong", "Tura", "Jowai", "Nongpoh"],
  Mizoram: ["Aizawl", "Lunglei", "Champhai", "Kolasib"],
  Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Sambalpur", "Berhampur"],
  Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar"],
  Sikkim: ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Erode", "Vellore"],
  Telangana: ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam", "Mahbubnagar"],
  Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Ghaziabad", "Kanpur", "Agra", "Varanasi", "Meerut", "Prayagraj"],
  Uttarakhand: ["Dehradun", "Haridwar", "Haldwani", "Roorkee", "Rishikesh", "Nainital"],
  "West Bengal": ["Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol", "Kharagpur"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  Dadra: ["Dadra"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  Daman: ["Daman"],
};

const products = productCards.map((card, index) => {
  const id = card.dataset.productId || `product-${index + 1}`;
  const name = card.dataset.name || `Product ${index + 1}`;
  const badge = card.dataset.badge || "";
  const category = card.dataset.category || "";
  const tagline = card.dataset.tagline || "";
  const imageSrc = card.dataset.imageSrc || "";
  const modalGallerySources = (card.dataset.modalGallery || card.dataset.modalImageSrc || imageSrc)
    .split(",")
    .map((src) => src.trim())
    .filter(Boolean);
  const description = card.dataset.description || `${name} is part of the Auriva \u00C9lite ${category.toLowerCase()} edit, designed for customers who want a more refined premium presentation at home.`;
  const productInfo = card.dataset.productInfo || "";
  const amazonUrl = card.dataset.amazonUrl || "";
  const price = Number(card.dataset.price || "0");
  const mrp = Number(card.dataset.mrp || "0");
  const priceText = `\u20B9${price.toLocaleString("en-IN")}`;
  const mrpText = mrp > price ? `\u20B9${mrp.toLocaleString("en-IN")}` : "";
  const includes = card.dataset.includes || "";
  const highlights = card.dataset.highlights || "";
  const review = card.dataset.review || "";
  const searchText = [name, badge, category, tagline, description, productInfo, includes, highlights, review]
    .join(" ")
    .toLowerCase();

  return {
    id,
    name,
    badge,
    category,
    tagline,
    imageSrc,
    modalGallerySources,
    price,
    priceText,
    mrp,
    mrpText,
    includes,
    highlights,
    review,
    description,
    productInfo,
    amazonUrl,
    searchText,
    card,
  };
});

function populateStateOptions() {
  if (!customerState) return;

  const dynamicStates = Array.from(stateCodeByName.keys());
  const stateNames =
    dynamicStates.length > 0
      ? dynamicStates.sort((a, b) => a.localeCompare(b))
      : Object.keys(stateCityMap).sort((a, b) => a.localeCompare(b));
  const options = ['<option value="">Select state</option>']
    .concat(stateNames.map((state) => `<option value="${state}">${state}</option>`))
    .join("");

  customerState.innerHTML = options;
}

function populateProfileStateOptions() {
  if (!profileStateOptions) return;

  const dynamicStates = Array.from(stateCodeByName.keys());
  const stateNames =
    dynamicStates.length > 0
      ? dynamicStates.sort((a, b) => a.localeCompare(b))
      : Object.keys(stateCityMap).sort((a, b) => a.localeCompare(b));

  profileStateOptions.innerHTML = stateNames
    .map((state) => `<option value="${state}"></option>`)
    .join("");
}

function populateCityOptions(stateName, selectElement = customerCity) {
  if (!selectElement) return;

  const cities = fullCityMap.get(stateName) || stateCityMap[stateName] || [];
  selectElement.innerHTML =
    ['<option value="">Select city</option>']
      .concat(cities.map((city) => `<option value="${city}">${city}</option>`))
      .join("");

  selectElement.disabled = cities.length === 0;
}

function populateProfileCityOptions(stateName) {
  if (!profileCityOptions) return;

  const cities = fullCityMap.get(stateName) || stateCityMap[stateName] || [];
  profileCityOptions.innerHTML = cities
    .map((city) => `<option value="${city}"></option>`)
    .join("");
}

async function loadFullIndiaLocationData() {
  try {
    countryStateCityModule = await import(
      "https://cdn.jsdelivr.net/npm/country-state-city@3.2.1/+esm"
    );

    const allStates =
      countryStateCityModule?.State?.getStatesOfCountry("IN") || [];

    stateCodeByName.clear();
    fullCityMap.clear();

    allStates.forEach((state) => {
      if (!state?.name || !state?.isoCode) return;

      stateCodeByName.set(state.name, state.isoCode);

      const cities =
        countryStateCityModule?.City?.getCitiesOfState("IN", state.isoCode)
          ?.map((city) => city?.name?.trim())
          .filter(Boolean) || [];

      const uniqueCities = Array.from(new Set(cities)).sort((a, b) =>
        a.localeCompare(b)
      );

      if (uniqueCities.length > 0) {
        fullCityMap.set(state.name, uniqueCities);
      }
    });

    populateStateOptions();
    populateProfileStateOptions();
    populateCityOptions(customerState?.value || "");
    populateProfileCityOptions(profileStateInput?.value || "");

    if (checkoutFeedback) {
      checkoutFeedback.textContent =
        "Full India state and city list loaded for checkout.";
    }
  } catch {
    populateStateOptions();
    populateProfileStateOptions();
    populateCityOptions(customerState?.value || "");
    populateProfileCityOptions(profileStateInput?.value || "");

    if (checkoutFeedback) {
      checkoutFeedback.textContent =
        "Using local fallback state and city list right now.";
    }
  }
}

function setSelectedValue(selectElement, value) {
  if (!selectElement || !value) return false;

  const normalizedTarget = value.trim().toLowerCase();
  const matchingOption = Array.from(selectElement.options).find(
    (option) => option.value.trim().toLowerCase() === normalizedTarget
  );

  if (!matchingOption) return false;

  selectElement.value = matchingOption.value;
  return true;
}

function setInputValueByMatch(inputElement, value, options = []) {
  if (!inputElement || !value) return false;

  const normalizedTarget = value.trim().toLowerCase();
  const matchingValue = options.find((option) => option.trim().toLowerCase() === normalizedTarget);

  if (!matchingValue) {
    inputElement.value = value;
    return false;
  }

  inputElement.value = matchingValue;
  return true;
}

function setLocationFieldValue(fieldElement, value, options = []) {
  if (!fieldElement || !value) return false;

  if (fieldElement.tagName === "SELECT") {
    return setSelectedValue(fieldElement, value);
  }

  return setInputValueByMatch(fieldElement, value, options);
}

function ensureCityOption(cityName, selectElement = customerCity) {
  if (!selectElement || !cityName) return;

  const exists = Array.from(selectElement.options).some(
    (option) => option.value.trim().toLowerCase() === cityName.trim().toLowerCase()
  );

  if (!exists) {
    const option = document.createElement("option");
    option.value = cityName;
    option.textContent = cityName;
    selectElement.appendChild(option);
  }
}

async function lookupPincodeDetails(
  pincode,
  stateElement = customerState,
  cityElement = customerCity,
  feedbackElement = checkoutFeedback,
  scope = "checkout"
) {
  if (!/^\d{6}$/.test(pincode)) return;
  if (pincode === lastPincodeLookupByScope.get(scope)) return;

  lastPincodeLookupByScope.set(scope, pincode);

  if (feedbackElement) {
    feedbackElement.textContent = "Checking pincode and filling city/state...";
  }

  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const result = await response.json();
    const firstResult = Array.isArray(result) ? result[0] : null;
    const firstPostOffice = firstResult?.PostOffice?.[0];

    if (!firstResult || firstResult.Status !== "Success" || !firstPostOffice) {
      if (checkoutFeedback) {
        checkoutFeedback.textContent =
          "We could not auto-fill this pincode. Please select state and city manually.";
      }
      return;
    }

    const apiState = firstPostOffice.State?.trim() || "";
    const apiDistrict = firstPostOffice.District?.trim() || "";

    const stateOptions = Array.from(stateCodeByName.keys()).length > 0
      ? Array.from(stateCodeByName.keys())
      : Object.keys(stateCityMap);
    const stateMatched = setLocationFieldValue(stateElement, apiState, stateOptions);
    if (stateMatched) {
      populateCityOptions(stateElement.value, cityElement);
    }

    if (cityElement) {
      const cityOptions = fullCityMap.get(stateElement.value) || stateCityMap[stateElement.value] || [];
      if (cityElement.tagName === "SELECT") {
        ensureCityOption(apiDistrict, cityElement);
        cityElement.disabled = false;
        setSelectedValue(cityElement, apiDistrict);
      } else {
        setLocationFieldValue(cityElement, apiDistrict, cityOptions);
      }
    }

    if (feedbackElement) {
      feedbackElement.textContent = `Auto-filled ${apiDistrict || "city"} and ${apiState || "state"} from pincode.`;
    }
  } catch {
    if (feedbackElement) {
      feedbackElement.textContent =
        "Auto-fill could not run right now. You can still select state and city manually.";
    }
  }
}

function setAuthMessage(message, tone = "neutral") {
  if (!authStatus) return;
  authStatus.textContent = message;
  authStatus.dataset.tone = tone;
}

function getAuthEmailAddress() {
  return authUser?.email?.trim().toLowerCase() || "";
}

function getProfileStorageKey(email) {
  return `${PROFILE_STORAGE_PREFIX}${email.trim().toLowerCase()}`;
}

function readSavedProfile(email) {
  if (!email) return null;

  const storageKey = getProfileStorageKey(email);
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) return JSON.parse(stored);
  } catch {
    // Ignore localStorage parse/read issues.
  }

  return null;
}

function saveProfileLocally(profile) {
  const email = getAuthEmailAddress();
  if (!email) return;

  try {
    localStorage.setItem(getProfileStorageKey(email), JSON.stringify(profile));
  } catch {
    // Ignore localStorage issues.
  }
}

function collectCheckoutProfile() {
  return {
    name: customerName?.value.trim() || "",
    phone: customerPhone?.value.trim() || "",
    address: customerAddress?.value.trim() || "",
    state: customerState?.value.trim() || "",
    city: customerCity?.value.trim() || "",
    pincode: customerPincode?.value.trim() || "",
    landmark: customerLandmark?.value.trim() || "",
    note: customerNote?.value.trim() || "",
  };
}

function populateCheckoutProfile(profile) {
  if (!profile) return;

  if (customerName && !customerName.value.trim()) customerName.value = profile.name || "";
  if (customerPhone && !customerPhone.value.trim()) customerPhone.value = profile.phone || "";
  if (customerAddress && !customerAddress.value.trim()) customerAddress.value = profile.address || "";
  if (customerLandmark && !customerLandmark.value.trim()) customerLandmark.value = profile.landmark || "";
  if (customerNote && !customerNote.value.trim()) customerNote.value = profile.note || "";

  if (profile.state) {
    const changed = setSelectedValue(customerState, profile.state);
    if (changed) {
      populateCityOptions(customerState.value);
    }
  }

  if (profile.city) {
    ensureCityOption(profile.city);
    setSelectedValue(customerCity, profile.city);
  }

  if (customerPincode && !customerPincode.value.trim()) customerPincode.value = profile.pincode || "";
}

async function persistCheckoutProfile() {
  const email = getAuthEmailAddress();
  if (!email) return;

  const profile = collectCheckoutProfile();
  saveProfileLocally(profile);

  if (!authSessionToken) return;

  try {
    await fetchAuthJson("/api/profile", {
      method: "PUT",
      body: JSON.stringify({ email, profile }),
    });
  } catch {
    // Keep the local copy even if the server update fails.
  }
}

function updateAuthButton() {
  if (!authToggleButton) return;

  if (authUser) {
    const userEmail = authUser.email || "Account";
    authToggleButton.textContent = "Logout";
    authToggleButton.dataset.state = "signed-in";
    authToggleButton.title = userEmail;
    return;
  }

  authToggleButton.textContent = "Login";
  authToggleButton.dataset.state = "signed-out";
  authToggleButton.title = "Login with email code";
}

function updateCheckoutButton() {
  if (!checkoutButton) return;
  checkoutButton.textContent = authUser
    ? "Checkout on WhatsApp"
    : "Login to checkout";
}

function updateProfileButton() {
  if (!profileButton) return;
  profileButton.hidden = !authUser;
}

function setProfileMessage(message, tone = "neutral") {
  if (!profileFeedback) return;
  profileFeedback.textContent = message;
  profileFeedback.dataset.tone = tone;
}

function collectProfileForm() {
  return {
    name: profileNameInput?.value.trim() || "",
    phone: profilePhoneInput?.value.trim() || "",
    address: profileAddressInput?.value.trim() || "",
    state: profileStateInput?.value.trim() || "",
    city: profileCityInput?.value.trim() || "",
    pincode: profilePincodeInput?.value.trim() || "",
    landmark: profileLandmarkInput?.value.trim() || "",
  };
}

function populateProfileForm(profile) {
  if (!profile) return;

  if (profileNameInput && !profileNameInput.value.trim()) profileNameInput.value = profile.name || "";
  if (profilePhoneInput && !profilePhoneInput.value.trim()) profilePhoneInput.value = profile.phone || "";
  if (profileAddressInput && !profileAddressInput.value.trim()) profileAddressInput.value = profile.address || "";
  if (profileLandmarkInput && !profileLandmarkInput.value.trim()) profileLandmarkInput.value = profile.landmark || "";

  if (profile.state) {
    setLocationFieldValue(
      profileStateInput,
      profile.state,
      Array.from(stateCodeByName.keys()).length > 0
        ? Array.from(stateCodeByName.keys())
        : Object.keys(stateCityMap)
    );
    populateProfileCityOptions(profileStateInput.value);
  }

  if (profile.city) {
    setLocationFieldValue(
      profileCityInput,
      profile.city,
      fullCityMap.get(profileStateInput?.value || "") || stateCityMap[profileStateInput?.value || ""] || []
    );
  }

  if (profilePincodeInput && !profilePincodeInput.value.trim()) profilePincodeInput.value = profile.pincode || "";
}

function updateProfileSummary(profile) {
  if (profileEmail) profileEmail.textContent = getAuthEmailAddress() || "-";
  if (profilePhone) profilePhone.textContent = profile?.phone || "-";
  if (profileAddress) profileAddress.textContent = profile?.address || "-";
  if (profileCity) profileCity.textContent = profile?.city || "-";
  if (profileState) profileState.textContent = profile?.state || "-";
  if (profilePincode) profilePincode.textContent = profile?.pincode || "-";
}

function openProfileModal() {
  if (!authUser) {
    openAuthModal();
    return;
  }

  const profile = collectCheckoutProfile();
  populateProfileForm(readSavedProfile(getAuthEmailAddress()) || profile);
  updateProfileSummary(profile);
  setProfileMessage("These are the details saved to your account.", "neutral");

  if (!profileModal) return;
  profileModal.classList.add("is-open");
  profileModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => profileNameInput?.focus(), 50);
}

function closeProfileModal() {
  if (!profileModal) return;
  profileModal.classList.remove("is-open");
  profileModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

async function saveProfileFromProfileModal() {
  if (!authUser) {
    openAuthModal();
    return;
  }

  const profile = collectProfileForm();
  if (!profile.name || !profile.phone || !profile.address || !profile.state || !profile.city || !profile.pincode) {
    setProfileMessage("Please fill name, phone, address, state, city, and pincode before saving.", "error");
    return;
  }

  populateCheckoutProfile(profile);
  saveProfileLocally(profile);
  updateProfileSummary(profile);
  setProfileMessage("Profile saved and synced with checkout.", "success");
  showToast("Profile saved");

  if (authSessionToken) {
    try {
      await fetchAuthJson("/api/profile", {
        method: "PUT",
        body: JSON.stringify({ email: getAuthEmailAddress(), profile }),
      });
    } catch {
      // Keep the local profile if the server sync is unavailable.
    }
  }
}

function openAuthModal() {
  if (!authModal) return;
  authModal.classList.add("is-open");
  authModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => authEmail?.focus(), 50);
}

function closeAuthModal() {
  if (!authModal) return;
  authModal.classList.remove("is-open");
  authModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function openCheckoutModal() {
  if (!checkoutModal) return;
  checkoutModal.classList.add("is-open");
  checkoutModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => customerName?.focus(), 50);
}

function closeCheckoutModal() {
  if (!checkoutModal) return;
  checkoutModal.classList.remove("is-open");
  checkoutModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function fetchAuthJson(path, options = {}) {
  if (!AUTH_API_BASE_URL || AUTH_API_BASE_URL.includes("YOUR-CLOUDFLARE-WORKER-URL")) {
    throw new Error("Set AUTH_API_BASE_URL in script.js to your Cloudflare Worker URL.");
  }

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (authSessionToken) {
    headers.set("Authorization", `Bearer ${authSessionToken}`);
  }

  return fetch(`${AUTH_API_BASE_URL}${path}`, {
    ...options,
    headers,
  }).then(async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.error || "Request failed");
    }
    return data;
  });
}

function saveAuthSession(token, email) {
  authSessionToken = token;
  authUser = { email };

  try {
    localStorage.setItem(AUTH_SESSION_KEY, token);
  } catch {
    // Ignore storage errors.
  }

  updateAuthButton();
  updateCheckoutButton();
  updateProfileButton();
}

function clearAuthSession() {
  authSessionToken = "";
  authUser = null;

  try {
    localStorage.removeItem(AUTH_SESSION_KEY);
  } catch {
    // Ignore storage errors.
  }

  updateAuthButton();
  updateCheckoutButton();
  updateProfileButton();
}

async function restoreAuthSession() {
  let storedToken = "";

  try {
    storedToken = localStorage.getItem(AUTH_SESSION_KEY) || "";
  } catch {
    storedToken = "";
  }

  if (!storedToken) return;

  authSessionToken = storedToken;

  try {
    const session = await fetchAuthJson("/api/auth/me");
    authUser = { email: session.email };
    if (session.profile) {
      populateCheckoutProfile(session.profile);
      saveProfileLocally(session.profile);
    }
    updateProfileButton();
  } catch {
    clearAuthSession();
  }
}

async function requestLoginCode() {
  if (!authEmail) return;

  const email = authEmail.value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setAuthMessage("Please enter a valid email address.", "error");
    authEmail.focus();
    return;
  }

  authSendButton?.setAttribute("disabled", "true");
  setAuthMessage("Sending code...", "neutral");

  try {
    await fetchAuthJson("/api/auth/request-code", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setAuthMessage("Code sent. Check your inbox and spam folder.", "success");
    authCode?.focus();
  } catch (error) {
    setAuthMessage(error.message || "We could not send the code right now.", "error");
  } finally {
    authSendButton?.removeAttribute("disabled");
  }
}

async function verifyLoginCode() {
  const email = authEmail?.value.trim() || "";
  const code = authCode?.value.trim() || "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setAuthMessage("Enter the same email you used to request the code.", "error");
    authEmail?.focus();
    return;
  }

  if (!/^\d{6}$/.test(code)) {
    setAuthMessage("The login code must be exactly 6 digits.", "error");
    authCode?.focus();
    return;
  }

  authVerifyButton?.setAttribute("disabled", "true");
  setAuthMessage("Verifying code...", "neutral");

  try {
    const result = await fetchAuthJson("/api/auth/verify-code", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });

    saveAuthSession(result.sessionToken, result.email);
    closeAuthModal();
    populateCheckoutProfile(result.profile || readSavedProfile(result.email) || null);
    await persistCheckoutProfile();
    updateProfileButton();
    setAuthMessage(`Signed in as ${result.email}.`, "success");
    showToast("Login successful");
  } catch (error) {
    setAuthMessage(error.message || "That code could not be verified.", "error");
  } finally {
    authVerifyButton?.removeAttribute("disabled");
  }
}

async function logoutUser() {
  if (authSessionToken) {
    try {
      await fetchAuthJson("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore server-side logout failures and clear the local session anyway.
    }
  }

  clearAuthSession();
  setAuthMessage("You have been signed out.", "neutral");
  closeProfileModal();
  openAuthModal();
}

async function initializeAuth() {
  await restoreAuthSession();
  updateAuthButton();
  updateCheckoutButton();
  updateProfileButton();

  if (!AUTH_API_BASE_URL || AUTH_API_BASE_URL.includes("YOUR-CLOUDFLARE-WORKER-URL")) {
    setAuthMessage("Cloudflare auth is not configured yet. Please update AUTH_API_BASE_URL.", "error");
    return;
  }

  if (authUser?.email) {
    setAuthMessage(`Signed in as ${authUser.email}.`, "success");
  } else {
    setAuthMessage("Sign in with your email to continue to checkout.", "neutral");
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

openCheckoutTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openCheckoutModal();
  });
});

authToggleButton?.addEventListener("click", () => {
  if (authUser) {
    logoutUser();
    return;
  }

  openAuthModal();
});

profileButton?.addEventListener("click", () => {
  openProfileModal();
});

authModalCloseButton?.addEventListener("click", closeAuthModal);
authSendButton?.addEventListener("click", requestLoginCode);
authVerifyButton?.addEventListener("click", verifyLoginCode);
authLogoutButton?.addEventListener("click", logoutUser);
profileModalCloseButton?.addEventListener("click", closeProfileModal);
profileForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await saveProfileFromProfileModal();
});
authCode?.addEventListener("input", () => {
  if (!authCode) return;
  authCode.value = authCode.value.replace(/\D/g, "").slice(0, 6);
});

authEmail?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    void requestLoginCode();
  }
});

authCode?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    void verifyLoginCode();
  }
});

authModal?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.dataset.authClose === "true") {
    closeAuthModal();
  }
});

profileModal?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.dataset.profileClose === "true") {
    closeProfileModal();
  }
});

productCards.forEach((card) => {
  const productId = card.dataset.productId;
  const hitbox = card.querySelector(".card-hitbox");
  const addButton = card.querySelector(".add-to-cart-button");

  hitbox?.addEventListener("click", () => openProductModal(productId));
  addButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    addToCart(productId);
  });
});

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(cartKey) || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function findProduct(productId) {
  return products.find((product) => product.id === productId) || null;
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  toast.setAttribute("aria-hidden", "false");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
    toast.setAttribute("aria-hidden", "true");
  }, 2200);
}

function addToCart(productId) {
  const product = findProduct(productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  renderCart();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
  const product = findProduct(productId);
  const updatedCart = getCart().filter((item) => item.id !== productId);
  saveCart(updatedCart);
  renderCart();

  if (product) showToast(`${product.name} removed from cart`);
}

function renderCart() {
  const fullItems = getCart()
    .map((item) => {
      const product = findProduct(item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const totalItems = fullItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = fullItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  if (headerCartCount) headerCartCount.textContent = String(totalItems);
  if (cartCountElement) cartCountElement.textContent = String(totalItems);
  if (cartTotalElement) {
    cartTotalElement.textContent = `\u20B9${totalPrice.toLocaleString("en-IN")}`;
  }

  if (!cartItemsContainer) return;

  if (fullItems.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-state">Your cart is currently empty.</p>';
    return;
  }

  cartItemsContainer.innerHTML = "";

  fullItems.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.quantity} \u00D7 ${item.priceText}</div>
      </div>
      <button class="remove-item-button" type="button">Remove</button>
    `;

    row
      .querySelector(".remove-item-button")
      ?.addEventListener("click", () => removeFromCart(item.id));
    cartItemsContainer.appendChild(row);
  });
}

function filterProducts(query) {
  const normalizedQuery = query.trim().toLowerCase();
  let visibleCount = 0;

  products.forEach((product) => {
    const isVisible =
      normalizedQuery === "" || product.searchText.includes(normalizedQuery);
    product.card.style.display = isVisible ? "" : "none";
    if (isVisible) visibleCount += 1;
  });

  if (!searchResultsText) return;

  searchResultsText.textContent =
    normalizedQuery === ""
      ? `Showing all ${products.length} products`
      : `Showing ${visibleCount} of ${products.length} products for "${query.trim()}"`;
}

function openProductModal(productId) {
  const product = findProduct(productId);
  if (!product || !modal) return;

  activeModalProductId = product.id;
  activeGalleryIndex = 0;
  modalBadge.textContent = product.badge;
  modalTitle.textContent = product.name;
  modalTagline.textContent = product.tagline;
  modalPrice.innerHTML = renderProductPrice(product);
  modalDescription.textContent = product.description;
  if (modalInfo) {
    modalInfo.innerHTML = renderProductInformation(product.productInfo);
    if (modalInfoBlock) {
      modalInfoBlock.style.display = product.productInfo ? "" : "none";
    }
  }
  modalIncludes.textContent = product.includes;
  modalHighlights.textContent = product.highlights;
  modalReviewText.textContent = product.review;

  if (modalGallery) {
    const galleryImages = product.modalGallerySources.length
      ? product.modalGallerySources
      : [product.imageSrc].filter(Boolean);
    renderProductGallery(product.name, galleryImages);
  }

  if (modalAmazonLink) {
    modalAmazonLink.href = product.amazonUrl || "https://www.amazon.in/dp/B0H6FYXG3X";
    modalAmazonLink.style.display = product.amazonUrl ? "" : "none";
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function renderProductPrice(product) {
  if (product.mrp && product.mrp > product.price) {
    return `
      <span class="product-price-current">${product.priceText}</span>
      <span class="product-price-mrp"><s>${product.mrpText}</s> MRP</span>
    `;
  }

  return `<span class="product-price-current">${product.priceText}</span>`;
}

function renderProductInformation(productInfo) {
  if (!productInfo) return "";

  const items = productInfo
    .split("|")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [label, ...rest] = entry.split(":");
      const value = rest.join(":").trim();
      return {
        label: (label || "").trim(),
        value,
      };
    })
    .filter((item) => item.label && item.value);

  if (!items.length) return "";

  return items
    .map(
      (item) => `
        <div class="product-info-row">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </div>
      `
    )
    .join("");
}

function closeProductModal() {
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (modalGrid) {
    modalGrid.classList.remove("has-visual");
  }
  if (modalGallery) {
    modalGallery.innerHTML = "";
  }
  if (modalInfo) {
    modalInfo.innerHTML = "";
  }
  if (modalInfoBlock) {
    modalInfoBlock.style.display = "";
  }
  if (modalAmazonLink) {
    modalAmazonLink.style.display = "";
  }
  activeModalProductId = null;
  activeGalleryIndex = 0;
}

function renderProductGallery(productName, galleryImages) {
  if (!modalGallery) return;

  const hasMultipleImages = galleryImages.length > 1;
  const safeIndex = Math.min(activeGalleryIndex, Math.max(galleryImages.length - 1, 0));
  activeGalleryIndex = safeIndex;

  modalGallery.innerHTML = `
    <div class="gallery-frame">
      <button class="gallery-nav gallery-prev" type="button" aria-label="Previous product image" ${
        hasMultipleImages ? "" : "disabled"
      }>&lsaquo;</button>
      <img
        class="product-modal-gallery-image"
        src="${galleryImages[safeIndex] || ""}"
        alt="${productName} product photo ${safeIndex + 1}"
      />
      <button class="gallery-nav gallery-next" type="button" aria-label="Next product image" ${
        hasMultipleImages ? "" : "disabled"
      }>&rsaquo;</button>
    </div>
    <div class="gallery-thumbs">
      ${galleryImages
        .map(
          (src, index) => `
            <button
              class="gallery-thumb ${index === safeIndex ? "is-active" : ""}"
              type="button"
              data-gallery-index="${index}"
              aria-label="Show product image ${index + 1}"
            >
              <img src="${src}" alt="" />
            </button>
          `
        )
        .join("")}
    </div>
  `;

  if (modalGrid) {
    modalGrid.classList.toggle("has-visual", galleryImages.length > 0);
  }
}

function showGalleryImageByOffset(offset) {
  if (!activeModalProductId || !modalGallery) return;

  const product = findProduct(activeModalProductId);
  if (!product) return;

  const galleryImages = product.modalGallerySources.length
    ? product.modalGallerySources
    : [product.imageSrc].filter(Boolean);

  if (galleryImages.length === 0) return;

  activeGalleryIndex =
    (activeGalleryIndex + offset + galleryImages.length) % galleryImages.length;
  renderProductGallery(product.name, galleryImages);
}

function buildCheckoutWhatsappMessage() {
  const cart = getCart();
  if (cart.length === 0) {
    return { error: "Add at least one product before checkout." };
  }

  const fullItems = cart
    .map((item) => {
      const product = findProduct(item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const totalItems = fullItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = fullItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const name = customerName?.value.trim() || "";
  const phone = customerPhone?.value.trim() || "";
  const address = customerAddress?.value.trim() || "";
  const state = customerState?.value.trim() || "";
  const city = customerCity?.value.trim() || "";
  const pincode = customerPincode?.value.trim() || "";
  const landmark = customerLandmark?.value.trim() || "";
  const note = customerNote?.value.trim() || "";

  if (!name || !phone || !address || !state || !city || !pincode) {
    return { error: "Please fill name, phone, address, state, city, and pincode." };
  }

  const lines = [
    "Hello Auriva \u00C9lite, I want to place this order:",
    "",
    ...fullItems.map(
      (item) =>
        `- ${item.name} x ${item.quantity} - \u20B9${(
          item.price * item.quantity
        ).toLocaleString("en-IN")}`
    ),
    "",
    `Total items: ${totalItems}`,
    `Estimated total: \u20B9${totalPrice.toLocaleString("en-IN")}`,
    "",
    "Customer details:",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address}`,
    `City: ${city}`,
    `State: ${state}`,
    `Pincode: ${pincode}`,
    landmark ? `Landmark: ${landmark}` : "",
    note ? `Order note: ${note}` : "",
    "",
    "Payment mode: Cash on Delivery",
    "Delivery timeline: 5-9 days",
    "Please confirm this order on WhatsApp.",
  ].filter(Boolean);

  return { url: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}` };
}

if (searchInput) {
  searchInput.addEventListener("input", () => filterProducts(searchInput.value));
}

customerState?.addEventListener("change", () => {
  populateCityOptions(customerState.value);
});

customerPincode?.addEventListener("blur", () => {
  const cleanedPincode = customerPincode.value.replace(/\D/g, "");
  customerPincode.value = cleanedPincode;
  lookupPincodeDetails(cleanedPincode);
});

customerPincode?.addEventListener("input", () => {
  const cleanedPincode = customerPincode.value.replace(/\D/g, "").slice(0, 6);
  customerPincode.value = cleanedPincode;

  if (cleanedPincode.length === 6) {
    lookupPincodeDetails(cleanedPincode);
  } else if (checkoutFeedback && cleanedPincode.length === 0) {
    checkoutFeedback.textContent = "";
    lastPincodeLookupByScope.delete("checkout");
  }
});

profileStateInput?.addEventListener("input", () => {
  populateProfileCityOptions(profileStateInput.value);
});

profileStateInput?.addEventListener("change", () => {
  populateProfileCityOptions(profileStateInput.value);
});

profilePincodeInput?.addEventListener("blur", () => {
  const cleanedPincode = profilePincodeInput.value.replace(/\D/g, "");
  profilePincodeInput.value = cleanedPincode;
  lookupPincodeDetails(cleanedPincode, profileStateInput, profileCityInput, profileFeedback, "profile");
});

profilePincodeInput?.addEventListener("input", () => {
  const cleanedPincode = profilePincodeInput.value.replace(/\D/g, "").slice(0, 6);
  profilePincodeInput.value = cleanedPincode;

  if (cleanedPincode.length === 6) {
    lookupPincodeDetails(cleanedPincode, profileStateInput, profileCityInput, profileFeedback, "profile");
  } else if (profileFeedback && cleanedPincode.length === 0) {
    profileFeedback.textContent = "";
    lastPincodeLookupByScope.delete("profile");
  }
});

checkoutForm?.addEventListener("input", () => {
  if (authUser) {
    void persistCheckoutProfile();
  }
});

clearCartButton?.addEventListener("click", () => {
  saveCart([]);
  renderCart();
  showToast("Cart cleared");
});

checkoutForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!authUser) {
    const message = "Please sign in with your email before placing the order.";
    if (checkoutFeedback) checkoutFeedback.textContent = message;
    showToast(message);
    openAuthModal();
    return;
  }

  const result = buildCheckoutWhatsappMessage();
  if (result.error) {
    if (checkoutFeedback) checkoutFeedback.textContent = result.error;
    showToast(result.error);
    return;
  }

  if (checkoutFeedback) {
    checkoutFeedback.textContent =
      "WhatsApp is opening with your full order and address details.";
  }

  await persistCheckoutProfile();
  showToast("Checkout ready on WhatsApp");
  window.open(result.url, "_blank", "noopener");
});

checkoutModalCloseButton?.addEventListener("click", closeCheckoutModal);
checkoutModal?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.dataset.closeCheckout === "true") {
    closeCheckoutModal();
  }
});

modalCloseButton?.addEventListener("click", closeProductModal);
modal?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.dataset.closeModal === "true") {
    closeProductModal();
  }
});

modalGallery?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const thumbButton = target.closest("[data-gallery-index]");
  if (thumbButton instanceof HTMLElement) {
    const index = Number(thumbButton.dataset.galleryIndex || "0");
    const product = activeModalProductId ? findProduct(activeModalProductId) : null;
    if (!product) return;
    const galleryImages = product.modalGallerySources.length
      ? product.modalGallerySources
      : [product.imageSrc].filter(Boolean);
    if (galleryImages.length === 0) return;
    activeGalleryIndex = Number.isFinite(index) ? Math.max(0, Math.min(index, galleryImages.length - 1)) : 0;
    renderProductGallery(product.name, galleryImages);
    return;
  }

  if (target.closest(".gallery-prev")) {
    showGalleryImageByOffset(-1);
  }

  if (target.closest(".gallery-next")) {
    showGalleryImageByOffset(1);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProductModal();
    closeCheckoutModal();
  }
});

modalCartButton?.addEventListener("click", () => {
  if (!activeModalProductId) return;
  addToCart(activeModalProductId);
});

renderCart();
filterProducts("");
populateStateOptions();
populateCityOptions("");
updateCheckoutButton();
await loadFullIndiaLocationData();
await initializeAuth();

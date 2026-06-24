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
const checkoutAddressHint = document.getElementById("checkout-address-hint");
const checkoutAddressSummary = document.getElementById("checkout-address-summary");
const checkoutAddressSummaryLabel = document.getElementById("checkout-address-summary-label");
const checkoutAddressSummaryText = document.getElementById("checkout-address-summary-text");
const checkoutAddressList = document.getElementById("checkout-address-list");
const checkoutModal = document.getElementById("checkout-modal");
const checkoutModalCloseButton = document.getElementById("checkout-modal-close");
const toast = document.getElementById("toast");
const openCheckoutTriggers = Array.from(document.querySelectorAll("[data-open-checkout]"));
const profileButton = document.getElementById("profile-button");
const profileModal = document.getElementById("profile-modal");
const profileModalCloseButton = document.getElementById("profile-modal-close");
const profileForm = document.getElementById("profile-form");
const profileFeedback = document.getElementById("profile-feedback");
const profileEditBadge = document.getElementById("profile-edit-badge");
const profileCancelEditButton = document.getElementById("profile-cancel-edit-button");
const profileSaveButton = document.getElementById("profile-save-button");
const profileEmail = document.getElementById("profile-email");
const profilePhone = document.getElementById("profile-phone");
const profileAddress = document.getElementById("profile-address");
const profileCity = document.getElementById("profile-city");
const profileState = document.getElementById("profile-state");
const profilePincode = document.getElementById("profile-pincode");
const profileAddressCount = document.getElementById("profile-address-count");
const profileAddressList = document.getElementById("profile-address-list");
const profileDefaultAddress = document.getElementById("profile-default-address");
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
const productReviewForm = document.getElementById("product-review-form");
const productReviewName = document.getElementById("product-review-name");
const productReviewText = document.getElementById("product-review-text");
const productReviewRatingInputs = Array.from(
  document.querySelectorAll('input[name="product-review-rating"]')
);
const productReviewSubmit = document.getElementById("product-review-submit");
const productReviewCount = document.getElementById("product-review-count");
const productReviewAuthNote = document.getElementById("product-review-auth-note");
const productReviewSigninButton = document.getElementById("product-review-signin");
const productReviewList = document.getElementById("product-review-list");
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
const REVIEWS_API_BASE_URL = "https://auriva-elite-reviews-api.auriva-elite-auth.workers.dev";
const AUTH_SESSION_KEY = "auriva-elite-auth-session";
const AUTH_ACTIVITY_KEY = "auriva-elite-auth-last-activity";
const AUTH_IDLE_TIMEOUT_MS = 5 * 60 * 1000;
const AUTH_HEARTBEAT_THROTTLE_MS = 30 * 1000;
const PROFILE_STORAGE_PREFIX = "auriva-elite-profile:";

let activeModalProductId = null;
let activeGalleryIndex = 0;
let toastTimer = null;
const lastPincodeLookupByScope = new Map();
let activeCheckoutAddressId = "";
let editingProfileAddressId = "";
let editingProfileAddressLabel = "";
let countryStateCityModule = null;
let authUser = null;
let authSessionToken = "";
let authIdleTimer = null;
let lastAuthHeartbeatAt = 0;
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
  const searchText = [name, badge, category, tagline, description, productInfo, includes, highlights]
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

function renderCheckoutAddressOptions(profile, selectedId = "") {
  if (!checkoutAddressList) return;

  const normalized = normalizeSavedProfile(profile);
  const addresses = normalized?.addresses || [];

  if (addresses.length === 0) {
    checkoutAddressList.innerHTML =
      '<p class="empty-state checkout-address-empty">No saved addresses yet. Add one in your profile first.</p>';
    if (checkoutAddressSummary) checkoutAddressSummary.hidden = true;
    if (checkoutAddressHint) {
      checkoutAddressHint.textContent = "Your default saved address will be used automatically.";
    }
    activeCheckoutAddressId = "";
    return;
  }

  const nextSelectedId = selectedId && addresses.some((address) => address.id === selectedId)
    ? selectedId
    : normalized.defaultAddressId || addresses[0].id;

  const selectedAddress = addresses.find((address) => address.id === nextSelectedId) || addresses[0];
  const defaultAddress = addresses.find((address) => address.id === normalized.defaultAddressId) || addresses[0];
  activeCheckoutAddressId = selectedAddress?.id || "";

  checkoutAddressList.innerHTML = addresses
    .map((address) => {
      const isSelected = address.id === activeCheckoutAddressId;
      const isDefault = address.id === normalized.defaultAddressId;
      const details = [address.address, address.city, address.state, address.pincode].filter(Boolean).join(" ? ");
      return `
        <button
          type="button"
          class="checkout-address-card ${isSelected ? "is-selected" : ""} ${isDefault ? "is-default" : ""}"
          data-checkout-address="${escapeHtml(address.id)}"
          aria-pressed="${isSelected ? "true" : "false"}"
        >
          <span class="checkout-address-card-head">
            <strong>${escapeHtml(address.label || "Saved address")}</strong>
            ${isDefault ? '<span class="checkout-address-card-badge">Default</span>' : ''}
          </span>
          <span class="checkout-address-card-name">${escapeHtml(address.name || "")}</span>
          <span class="checkout-address-card-details">${escapeHtml(details)}</span>
        </button>
      `;
    })
    .join("");

  if (checkoutAddressHint) {
    if (selectedAddress && defaultAddress && selectedAddress.id === defaultAddress.id) {
      checkoutAddressHint.textContent = `Using default: ${formatSavedAddressLabel(selectedAddress)}.`;
    } else if (selectedAddress) {
      checkoutAddressHint.textContent = `Using saved address: ${formatSavedAddressLabel(selectedAddress)}.`;
    } else {
      checkoutAddressHint.textContent = "Choose from your saved addresses.";
    }
  }

  if (checkoutAddressSummary) {
    checkoutAddressSummary.hidden = false;
    checkoutAddressSummary.classList.toggle("is-active", selectedAddress.id !== defaultAddress.id);
  }
  if (checkoutAddressSummaryLabel) {
    checkoutAddressSummaryLabel.textContent = selectedAddress.id === defaultAddress.id ? "Default" : "Selected";
  }
  if (checkoutAddressSummaryText) {
    checkoutAddressSummaryText.textContent = formatSavedAddressLabel(selectedAddress);
  }
}

function renderProfileAddressBook(profile) {
  if (!profileAddressList || !profileAddressCount) return;

  const normalized = normalizeSavedProfile(profile);
  const addresses = normalized?.addresses || [];

  profileAddressCount.textContent =
    addresses.length === 1 ? "1 saved" : `${addresses.length} saved`;

  if (profileSaveButton) {
    profileSaveButton.textContent = addresses.length > 0 ? "Save another address" : "Save address";
  }

  if (addresses.length === 0) {
    profileAddressList.innerHTML =
      '<p class="empty-state profile-address-empty">No saved addresses yet. Add your first one below.</p>';
    return;
  }

  profileAddressList.innerHTML = addresses
    .map((address) => {
      const isDefault = address.id === normalized.defaultAddressId;
      const fullLine = [address.address, address.city, address.state, address.pincode]
        .filter(Boolean)
        .join(" · ");

      return `
        <article class="profile-address-card ${isDefault ? "is-default" : ""}">
          <div class="profile-address-card-head">
            <div>
              <strong>${escapeHtml(address.label || "Saved address")}</strong>
              ${isDefault ? '<span class="profile-default-badge">Default</span>' : ""}
            </div>
            <div class="profile-address-card-actions">
              <button type="button" class="text-button" data-address-edit="${escapeHtml(address.id)}">Edit</button>
              ${
                isDefault
                  ? ""
                  : `<button type="button" class="text-button" data-address-default="${escapeHtml(address.id)}">Set default</button>`
              }
              <button type="button" class="text-button" data-address-delete="${escapeHtml(address.id)}">Delete</button>
            </div>
          </div>
          <p>${escapeHtml(address.name || "")}</p>
          <p>${escapeHtml(address.phone || "")}</p>
          <p>${escapeHtml(fullLine)}</p>
          ${address.landmark ? `<p>${escapeHtml(address.landmark)}</p>` : ""}
        </article>
      `;
    })
    .join("");
}

function populateCheckoutFromAddress(address, { replace = false } = {}) {
  if (!address) return;

  if (customerName && (replace || !customerName.value.trim())) customerName.value = address.name || "";
  if (customerPhone && (replace || !customerPhone.value.trim())) customerPhone.value = address.phone || "";
  if (customerAddress && (replace || !customerAddress.value.trim())) customerAddress.value = address.address || "";
  if (customerLandmark && (replace || !customerLandmark.value.trim())) customerLandmark.value = address.landmark || "";

  if (address.state) {
    const changed = setSelectedValue(customerState, address.state);
    if (changed || replace) {
      populateCityOptions(customerState.value);
    }
  }

  if (address.city) {
    ensureCityOption(address.city);
    if (replace || !customerCity.value.trim()) {
      setSelectedValue(customerCity, address.city);
    }
  }

  if (customerPincode && (replace || !customerPincode.value.trim())) customerPincode.value = address.pincode || "";
}

function syncSavedAddressSelection(profile, addressId) {
  const normalized = normalizeSavedProfile(profile);
  const addresses = normalized?.addresses || [];
  if (addresses.length === 0) return null;

  const selectedAddress =
    addresses.find((address) => address.id === addressId) ||
    addresses.find((address) => address.id === normalized.defaultAddressId) ||
    addresses[0];

  if (!selectedAddress) return null;

  activeCheckoutAddressId = selectedAddress.id;
  renderCheckoutAddressOptions(normalized, selectedAddress.id);
  populateCheckoutFromAddress(selectedAddress, { replace: true });
  return selectedAddress;
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

function createAddressId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `addr-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeAddressEntry(address, index = 0) {
  if (!address || typeof address !== "object") return null;

  const id = String(address.id || "").trim() || createAddressId();
  const name = String(address.name || "").trim();
  const phone = String(address.phone || "").trim();
  const line = String(address.address || "").trim();
  const state = String(address.state || "").trim();
  const city = String(address.city || "").trim();
  const pincode = String(address.pincode || "").trim();
  const landmark = String(address.landmark || "").trim();
  const label =
    String(address.label || "").trim() ||
    (index === 0 ? "Default address" : `Address ${index + 1}`);

  return {
    id,
    label,
    name,
    phone,
    address: line,
    state,
    city,
    pincode,
    landmark,
    isDefault: Boolean(address.isDefault),
  };
}

function normalizeSavedProfile(profile) {
  if (!profile || typeof profile !== "object") return null;

  if (Array.isArray(profile.addresses) && profile.addresses.length > 0) {
    const addresses = profile.addresses
      .map((address, index) => normalizeAddressEntry(address, index))
      .filter(Boolean);

    if (addresses.length === 0) return null;

    let defaultAddressId = String(profile.defaultAddressId || "").trim();
    if (!defaultAddressId || !addresses.some((address) => address.id === defaultAddressId)) {
      defaultAddressId = addresses.find((address) => address.isDefault)?.id || addresses[0].id;
    }

    addresses.forEach((address) => {
      address.isDefault = address.id === defaultAddressId;
    });

    const defaultAddress = addresses.find((address) => address.id === defaultAddressId) || addresses[0];

    return {
      name: String(profile.name || defaultAddress?.name || "").trim(),
      phone: String(profile.phone || defaultAddress?.phone || "").trim(),
      defaultAddressId,
      addresses,
    };
  }

  const legacyAddress = normalizeAddressEntry(
    {
      id: "default-address",
      label: "Default address",
      name: profile.name || "",
      phone: profile.phone || "",
      address: profile.address || "",
      state: profile.state || "",
      city: profile.city || "",
      pincode: profile.pincode || "",
      landmark: profile.landmark || "",
      isDefault: true,
    },
    0
  );

  const hasLegacyContent = Boolean(
    legacyAddress?.name ||
      legacyAddress?.phone ||
      legacyAddress?.address ||
      legacyAddress?.state ||
      legacyAddress?.city ||
      legacyAddress?.pincode ||
      legacyAddress?.landmark
  );

  if (!hasLegacyContent) {
    return null;
  }

  return {
    name: legacyAddress.name,
    phone: legacyAddress.phone,
    defaultAddressId: legacyAddress.id,
    addresses: [legacyAddress],
  };
}

function getDefaultSavedAddress(profile) {
  const normalized = normalizeSavedProfile(profile);
  if (!normalized?.addresses?.length) return null;
  return (
    normalized.addresses.find((address) => address.id === normalized.defaultAddressId) ||
    normalized.addresses[0] ||
    null
  );
}

function formatSavedAddressLabel(address) {
  if (!address) return "Saved address";
  const parts = [address.label, address.city, address.state].filter(Boolean);
  return parts.join(" · ") || "Saved address";
}

function getStoredAuthActivity() {
  try {
    const value = Number(localStorage.getItem(AUTH_ACTIVITY_KEY) || "0");
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

function saveStoredAuthActivity(timestamp) {
  try {
    localStorage.setItem(AUTH_ACTIVITY_KEY, String(timestamp));
  } catch {
    // Ignore storage errors.
  }
}

function clearStoredAuthActivity() {
  try {
    localStorage.removeItem(AUTH_ACTIVITY_KEY);
  } catch {
    // Ignore storage errors.
  }
}

function clearAuthIdleTimer() {
  if (authIdleTimer) {
    window.clearTimeout(authIdleTimer);
    authIdleTimer = null;
  }
}

function handleExpiredAuthSession(message = "Your session expired after 5 minutes of inactivity.") {
  clearAuthSession();
  closeCheckoutModal();
  closeProfileModal();
  setAuthMessage(message, "error");
  showToast("Session expired. Please sign in again.");
}

function scheduleAuthIdleTimeout(now = Date.now()) {
  clearAuthIdleTimer();

  if (!authUser || !authSessionToken) return;

  const lastActivity = getStoredAuthActivity() || now;
  const elapsed = now - lastActivity;

  if (elapsed >= AUTH_IDLE_TIMEOUT_MS) {
    handleExpiredAuthSession();
    return;
  }

  authIdleTimer = window.setTimeout(() => {
    handleExpiredAuthSession();
  }, AUTH_IDLE_TIMEOUT_MS - elapsed);
}

async function refreshAuthSessionActivity({ touchServer = true } = {}) {
  if (!authUser || !authSessionToken) return;

  const now = Date.now();
  saveStoredAuthActivity(now);
  scheduleAuthIdleTimeout(now);

  if (!touchServer) return;
  if (now - lastAuthHeartbeatAt < AUTH_HEARTBEAT_THROTTLE_MS) return;

  lastAuthHeartbeatAt = now;

  try {
    await fetchAuthJson("/api/auth/heartbeat", { method: "POST" });
  } catch (error) {
    if (error?.status === 401) {
      handleExpiredAuthSession("Your session expired after 5 minutes of inactivity.");
    }
  }
}

function readSavedProfile(email) {
  if (!email) return null;

  const storageKey = getProfileStorageKey(email);
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) return normalizeSavedProfile(JSON.parse(stored));
  } catch {
    // Ignore localStorage parse/read issues.
  }

  return null;
}

function saveProfileLocally(profile) {
  const email = getAuthEmailAddress();
  if (!email) return;

  try {
    const normalized = normalizeSavedProfile(profile);
    if (!normalized) return;
    localStorage.setItem(getProfileStorageKey(email), JSON.stringify(normalized));
  } catch {
    // Ignore localStorage issues.
  }
}

async function syncProfileToServer(profile) {
  if (!authSessionToken) return;

  try {
    await fetchAuthJson("/api/profile", {
      method: "PUT",
      body: JSON.stringify({ email: getAuthEmailAddress(), profile }),
    });
  } catch {
    // Keep the local copy if the server sync is unavailable.
  }
}

function fetchReviewJson(path, options = {}) {
  if (!REVIEWS_API_BASE_URL || REVIEWS_API_BASE_URL.includes("YOUR-REVIEW-WORKER-URL")) {
    throw new Error("Set REVIEWS_API_BASE_URL in script.js to your review Worker URL.");
  }

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  return fetch(`${REVIEWS_API_BASE_URL}${path}`, {
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

async function fetchProductReviews(productId) {
  if (!productId) return [];

  const data = await fetchReviewJson(`/reviews?productId=${encodeURIComponent(productId)}`);
  return Array.isArray(data?.reviews) ? data.reviews : [];
}

function getSelectedReviewRating() {
  const selected = productReviewForm?.querySelector('input[name="product-review-rating"]:checked');
  const rating = Number(selected?.value || 5);
  return Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : 5;
}

function renderReviewStars(rating) {
  const value = Math.max(1, Math.min(5, Number(rating) || 5));
  return "\u2605\u2605\u2605\u2605\u2605"
    .split("")
    .map((star, index) => `<span class="${index < value ? "star-filled" : "star-muted"}">${star}</span>`)
    .join("");
}

function formatReviewSummary(reviews) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return "0 reviews";
  }

  const total = reviews.reduce((sum, review) => sum + (Number(review.rating) || 5), 0);
  const average = total / reviews.length;
  const label = reviews.length === 1 ? "review" : "reviews";
  return `${average.toFixed(1)} \u2605 · ${reviews.length} ${label}`;
}

async function postProductReview(productId, author, comment, rating) {
  if (!productId) return null;

  return fetchReviewJson("/reviews", {
    method: "POST",
    body: JSON.stringify({
      productId,
      author,
      comment,
      rating,
    }),
  });
}

function getDefaultReviewName() {
  const profile = readSavedProfile(getAuthEmailAddress());
  if (profile?.name) return profile.name;
  if (customerName?.value.trim()) return customerName.value.trim();
  return authUser?.email?.split("@")?.[0] || "Guest";
}

function formatReviewDate(timestamp) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(timestamp));
  } catch {
    return "";
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getReviewInitials(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "G";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

async function renderProductReviews(productId) {
  if (!productReviewList || !productReviewCount) return;

  productReviewCount.textContent = "Loading reviews…";
  productReviewList.innerHTML =
    '<p class="empty-state product-review-empty">Loading reviews for this product…</p>';

  let reviews = [];
  try {
    reviews = await fetchProductReviews(productId);
  } catch {
    reviews = [];
  }

  if (activeModalProductId !== productId) return;

  productReviewCount.textContent = formatReviewSummary(reviews);

  if (reviews.length === 0) {
    productReviewList.innerHTML =
      '<p class="empty-state product-review-empty">No reviews yet. Be the first to share one.</p>';
    return;
  }

  productReviewList.innerHTML = reviews
    .slice()
    .reverse()
    .map(
      (review) => `
        <article class="product-review-item">
          <div class="product-review-top">
            <div class="product-review-avatar" aria-hidden="true">${escapeHtml(getReviewInitials(review.author))}</div>
            <div class="product-review-meta">
              <div class="product-review-head">
                <strong>${escapeHtml(review.author)}</strong>
                <span>${escapeHtml(formatReviewDate(review.timestamp))}</span>
              </div>
              <div class="product-review-subhead">
                <span class="product-review-badge">Customer review</span>
                <span class="product-review-stars" aria-label="${Number(review.rating) || 5} out of 5 stars">
                  ${renderReviewStars(review.rating)}
                </span>
              </div>
            </div>
          </div>
          <p>${escapeHtml(review.comment)}</p>
        </article>
      `
    )
    .join("");
}

function resetProductReviewForm() {
  if (productReviewName) productReviewName.value = getDefaultReviewName();
  if (productReviewText) productReviewText.value = "";
  if (productReviewRatingInputs.length) {
    const defaultRating = productReviewRatingInputs.find((input) => input.value === "5");
    if (defaultRating) defaultRating.checked = true;
  }
}

function updateReviewFormAccess() {
  const signedIn = Boolean(authUser);

  if (productReviewForm) {
    productReviewForm.setAttribute("aria-disabled", String(!signedIn));
  }

  [productReviewName, productReviewText, productReviewSubmit, ...productReviewRatingInputs]
    .filter(Boolean)
    .forEach((control) => {
      control.disabled = !signedIn;
    });

  if (productReviewAuthNote) {
    productReviewAuthNote.hidden = signedIn;
  }

  if (productReviewSigninButton) {
    productReviewSigninButton.hidden = signedIn;
  }
}

async function saveProductReview(productId) {
  if (!productId || !productReviewText) return;

  if (!authUser) {
    showToast("Please sign in to write a review.");
    openAuthModal();
    return;
  }

  const author = (productReviewName?.value.trim() || getDefaultReviewName()).slice(0, 60);
  const comment = productReviewText.value.trim();
  const rating = getSelectedReviewRating();

  if (comment.length < 8) {
    showToast("Write a slightly longer review");
    return;
  }

  if (!REVIEWS_API_BASE_URL || REVIEWS_API_BASE_URL.includes("YOUR-REVIEW-WORKER-URL")) {
    showToast("Review sharing is not configured yet");
    return;
  }

  try {
    await postProductReview(productId, author, comment.slice(0, 800), rating);
    await renderProductReviews(productId);
  } catch (error) {
    showToast(error?.message || "Could not post your review");
    return;
  }

  resetProductReviewForm();
  showToast("Review posted");
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

function populateCheckoutProfile(profile, { replace = false } = {}) {
  if (!profile) return;

  if (Array.isArray(profile.addresses)) {
    const address = getDefaultSavedAddress(profile);
    renderCheckoutAddressOptions(profile, address?.id || "");
    populateCheckoutFromAddress(address, { replace: true });
    if (customerNote && !customerNote.value.trim()) customerNote.value = profile.note || "";
    return;
  }

  if (customerName && (replace || !customerName.value.trim())) customerName.value = profile.name || "";
  if (customerPhone && (replace || !customerPhone.value.trim())) customerPhone.value = profile.phone || "";
  if (customerAddress && (replace || !customerAddress.value.trim())) customerAddress.value = profile.address || "";
  if (customerLandmark && (replace || !customerLandmark.value.trim())) customerLandmark.value = profile.landmark || "";
  if (customerNote && (replace || !customerNote.value.trim())) customerNote.value = profile.note || "";

  if (profile.state) {
    const changed = setSelectedValue(customerState, profile.state);
    if (changed || replace) {
      populateCityOptions(customerState.value);
    }
  }

  if (profile.city) {
    ensureCityOption(profile.city);
    if (replace || !customerCity.value.trim()) {
      setSelectedValue(customerCity, profile.city);
    }
  }

  if (customerPincode && (replace || !customerPincode.value.trim())) customerPincode.value = profile.pincode || "";
}

async function persistCheckoutProfile() {
  const email = getAuthEmailAddress();
  if (!email) return;

  const current = collectCheckoutProfile();
  if (
    !current.name ||
    !current.phone ||
    !current.address ||
    !current.state ||
    !current.city ||
    !current.pincode
  ) {
    return;
  }

  const storedProfile = normalizeSavedProfile(readSavedProfile(email));
  const addresses = storedProfile?.addresses ? [...storedProfile.addresses] : [];
  let selectedAddressId = activeCheckoutAddressId || storedProfile?.defaultAddressId || addresses[0]?.id || "";

  if (addresses.length === 0) {
    selectedAddressId = createAddressId();
    addresses.push(
      normalizeAddressEntry(
        {
          id: selectedAddressId,
          label: "Default address",
          ...current,
          isDefault: true,
        },
        0
      )
    );
  } else {
    const currentIndex = addresses.findIndex((address) => address.id === selectedAddressId);
    if (currentIndex >= 0) {
      addresses[currentIndex] = normalizeAddressEntry(
        {
          ...addresses[currentIndex],
          ...current,
          id: addresses[currentIndex].id,
          label: addresses[currentIndex].label,
          isDefault: true,
        },
        currentIndex
      );
    } else {
      selectedAddressId = createAddressId();
      addresses.push(
        normalizeAddressEntry(
          {
            id: selectedAddressId,
            label: current.city || current.state || `Address ${addresses.length + 1}`,
            ...current,
            isDefault: true,
          },
          addresses.length
        )
      );
    }
  }

  const defaultAddressId = storedProfile?.defaultAddressId || selectedAddressId;
  const updatedProfile = {
    name: current.name,
    phone: current.phone,
    defaultAddressId,
    addresses: addresses.map((address, index) => ({
      ...address,
      label: address.label || (index === 0 ? "Default address" : `Address ${index + 1}`),
      isDefault: address.id === defaultAddressId,
    })),
  };

  saveProfileLocally(updatedProfile);
  updateProfileSummary(updatedProfile);
  renderCheckoutAddressOptions(updatedProfile, selectedAddressId);
  activeCheckoutAddressId = selectedAddressId;

  if (!authSessionToken) return;

  await syncProfileToServer(updatedProfile);

  await refreshAuthSessionActivity({ touchServer: true });
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

function populateProfileForm(profile, { replace = false } = {}) {
  if (!profile) return;

  if (profileNameInput && (replace || !profileNameInput.value.trim())) profileNameInput.value = profile.name || "";
  if (profilePhoneInput && (replace || !profilePhoneInput.value.trim())) profilePhoneInput.value = profile.phone || "";
  if (profileAddressInput && (replace || !profileAddressInput.value.trim())) profileAddressInput.value = profile.address || "";
  if (profileLandmarkInput && (replace || !profileLandmarkInput.value.trim())) profileLandmarkInput.value = profile.landmark || "";

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

  if (profilePincodeInput && (replace || !profilePincodeInput.value.trim())) profilePincodeInput.value = profile.pincode || "";
}

function clearProfileAddressForm() {
  if (profileNameInput) profileNameInput.value = "";
  if (profilePhoneInput) profilePhoneInput.value = "";
  if (profileAddressInput) profileAddressInput.value = "";
  if (profileStateInput) profileStateInput.value = "";
  if (profileCityInput) profileCityInput.value = "";
  if (profilePincodeInput) profilePincodeInput.value = "";
  if (profileLandmarkInput) profileLandmarkInput.value = "";
  if (profileDefaultAddress) profileDefaultAddress.checked = true;
  editingProfileAddressId = "";
  editingProfileAddressLabel = "";
  updateProfileAddressFormMode();
}

function updateProfileAddressFormMode() {
  if (profileSaveButton) {
    profileSaveButton.textContent = editingProfileAddressId ? "Update address" : "Save address";
  }
  if (profileCancelEditButton) {
    profileCancelEditButton.hidden = !editingProfileAddressId;
  }
  if (profileEditBadge) {
    profileEditBadge.hidden = !editingProfileAddressId;
    profileEditBadge.innerHTML = editingProfileAddressId
      ? `<span class="profile-edit-badge-icon" aria-hidden="true">✦</span><span>Updating: ${escapeHtml(editingProfileAddressLabel || "saved address")}</span>`
      : "";
  }
}

function cancelProfileAddressEdit() {
  clearProfileAddressForm();
  setProfileMessage("Edit cancelled.", "neutral");
}

function beginEditingProfileAddress(addressId) {
  if (!authUser) {
    openAuthModal();
    return;
  }

  const profile = normalizeSavedProfile(readSavedProfile(getAuthEmailAddress()));
  const address = profile?.addresses?.find((entry) => entry.id === addressId);
  if (!address) return;

  editingProfileAddressId = address.id;
  editingProfileAddressLabel = address.label || address.city || address.state || "saved address";
  populateProfileForm(address, { replace: true });
  if (profileDefaultAddress) profileDefaultAddress.checked = address.id === profile.defaultAddressId;
  updateProfileAddressFormMode();
  setProfileMessage("Editing a saved address. Save when you're done.", "neutral");
  profileModal?.classList.add("is-open");
  profileModal?.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => profileNameInput?.focus(), 50);
}

function updateProfileSummary(profile) {
  const normalized = normalizeSavedProfile(profile);
  const address = getDefaultSavedAddress(normalized);

  if (profileEmail) profileEmail.textContent = getAuthEmailAddress() || "-";
  if (profilePhone) profilePhone.textContent = address?.phone || normalized?.phone || "-";
  if (profileAddress) profileAddress.textContent = address?.address || "-";
  if (profileCity) profileCity.textContent = address?.city || "-";
  if (profileState) profileState.textContent = address?.state || "-";
  if (profilePincode) profilePincode.textContent = address?.pincode || "-";

  renderProfileAddressBook(normalized);
  renderCheckoutAddressOptions(normalized, address?.id || "");

  if (!address) {
    activeCheckoutAddressId = "";
  }
}

function openProfileModal() {
  if (!authUser) {
    openAuthModal();
    return;
  }

  editingProfileAddressId = "";
  const profile = normalizeSavedProfile(readSavedProfile(getAuthEmailAddress()));
  const defaultAddress = getDefaultSavedAddress(profile) || collectCheckoutProfile();
  populateProfileForm(defaultAddress, { replace: true });
  updateProfileSummary(profile);
  if (profileSaveButton) {
    profileSaveButton.textContent = profile?.addresses?.length ? "Save another address" : "Save address";
  }
  if (profileDefaultAddress) {
    profileDefaultAddress.checked = true;
  }
  setProfileMessage("These are the details saved to your account.", "neutral");
  updateProfileAddressFormMode();

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

  const newAddress = collectProfileForm();
  if (
    !newAddress.name ||
    !newAddress.phone ||
    !newAddress.address ||
    !newAddress.state ||
    !newAddress.city ||
    !newAddress.pincode
  ) {
    setProfileMessage("Please fill name, phone, address, state, city, and pincode before saving.", "error");
    return;
  }

  const currentProfile = normalizeSavedProfile(readSavedProfile(getAuthEmailAddress())) || {
    name: newAddress.name,
    phone: newAddress.phone,
    defaultAddressId: "",
    addresses: [],
  };

  const addresses = Array.isArray(currentProfile.addresses) ? [...currentProfile.addresses] : [];
  const existingIndex = editingProfileAddressId
    ? addresses.findIndex((address) => address.id === editingProfileAddressId)
    : -1;
  const existingAddress = existingIndex >= 0 ? addresses[existingIndex] : null;
  const wantsDefault = Boolean(profileDefaultAddress?.checked);
  const addressId = existingAddress?.id || createAddressId();
  const addressLabel =
    existingAddress?.label ||
    newAddress.landmark ||
    newAddress.city ||
    newAddress.state ||
    `Address ${existingIndex >= 0 ? existingIndex + 1 : addresses.length + 1}`;

  const savedAddress = normalizeAddressEntry(
    {
      ...existingAddress,
      ...newAddress,
      id: addressId,
      label: addressLabel,
      isDefault: wantsDefault || addresses.length === 0 || !currentProfile.defaultAddressId,
    },
    existingIndex >= 0 ? existingIndex : addresses.length
  );

  if (!savedAddress) {
    setProfileMessage("Could not create this address right now.", "error");
    return;
  }

  if (existingIndex >= 0) {
    addresses[existingIndex] = savedAddress;
  } else {
    addresses.push(savedAddress);
  }

  let defaultAddressId = currentProfile.defaultAddressId || savedAddress.id;
  if (wantsDefault || addresses.length === 1 || !defaultAddressId) {
    defaultAddressId = savedAddress.id;
  }
  if (!addresses.some((address) => address.id === defaultAddressId)) {
    defaultAddressId = savedAddress.id;
  }
  if (!wantsDefault && existingAddress?.id === currentProfile.defaultAddressId && addresses.length > 1) {
    defaultAddressId = addresses.find((address) => address.id !== savedAddress.id)?.id || savedAddress.id;
  }

  const updatedProfile = {
    name: savedAddress.name,
    phone: savedAddress.phone,
    defaultAddressId,
    addresses: addresses.map((address) => ({
      ...address,
      isDefault: address.id === defaultAddressId,
    })),
  };

  saveProfileLocally(updatedProfile);
  populateCheckoutProfile(updatedProfile, { replace: true });
  updateProfileSummary(updatedProfile);
  renderProfileAddressBook(updatedProfile);
  renderCheckoutAddressOptions(updatedProfile, defaultAddressId);
  activeCheckoutAddressId = defaultAddressId;

  clearProfileAddressForm();

  setProfileMessage(existingIndex >= 0 ? "Address updated." : "Address saved. You can add another or keep this one as default.", "success");
  showToast(existingIndex >= 0 ? "Address updated" : "Address saved");

  await syncProfileToServer(updatedProfile);
  await refreshAuthSessionActivity({ touchServer: true });
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

  const savedProfile = normalizeSavedProfile(readSavedProfile(getAuthEmailAddress()));
  if (savedProfile?.addresses?.length) {
    const defaultAddress = getDefaultSavedAddress(savedProfile);
    renderCheckoutAddressOptions(savedProfile, defaultAddress?.id || "");
    populateCheckoutProfile(savedProfile, { replace: true });
  } else {
    renderCheckoutAddressOptions(savedProfile, "");
  }

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
      const error = new Error(data?.error || "Request failed");
      error.status = response.status;
      error.data = data;
      throw error;
    }
    return data;
  });
}

function saveAuthSession(token, email) {
  authSessionToken = token;
  authUser = { email };
  lastAuthHeartbeatAt = Date.now();

  try {
    localStorage.setItem(AUTH_SESSION_KEY, token);
  } catch {
    // Ignore storage errors.
  }

  saveStoredAuthActivity(Date.now());
  scheduleAuthIdleTimeout();
  updateAuthButton();
  updateCheckoutButton();
  updateProfileButton();
  updateReviewFormAccess();
}

function clearAuthSession() {
  authSessionToken = "";
  authUser = null;
  lastAuthHeartbeatAt = 0;
  clearAuthIdleTimer();
  clearStoredAuthActivity();
  activeCheckoutAddressId = "";
  editingProfileAddressId = "";
  editingProfileAddressLabel = "";

  try {
    localStorage.removeItem(AUTH_SESSION_KEY);
  } catch {
    // Ignore storage errors.
  }

  updateAuthButton();
  updateCheckoutButton();
  updateProfileButton();
  updateReviewFormAccess();
  renderCheckoutAddressOptions(null, "");
  updateProfileSummary(null);

  if (customerName) customerName.value = "";
  if (customerPhone) customerPhone.value = "";
  if (customerAddress) customerAddress.value = "";
  if (customerState) customerState.value = "";
  if (customerCity) customerCity.value = "";
  if (customerPincode) customerPincode.value = "";
  if (customerLandmark) customerLandmark.value = "";
  if (customerNote) customerNote.value = "";

  if (profileAddressCount) profileAddressCount.textContent = "0 saved";
  if (profileAddressList) {
    profileAddressList.innerHTML =
      '<p class="empty-state profile-address-empty">No saved addresses yet. Add your first one below.</p>';
  }
  if (profileSaveButton) {
    profileSaveButton.textContent = "Save address";
  }
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
      populateCheckoutProfile(session.profile, { replace: true });
      saveProfileLocally(session.profile);
    }
    saveStoredAuthActivity(Date.now());
    scheduleAuthIdleTimeout();
    updateProfileButton();
    updateReviewFormAccess();
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
    populateCheckoutProfile(result.profile || readSavedProfile(result.email) || null, {
      replace: true,
    });
    await persistCheckoutProfile();
    updateProfileButton();
    updateReviewFormAccess();
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

  updateReviewFormAccess();
}

function handleAuthActivity() {
  void refreshAuthSessionActivity();
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

document.querySelector(".brand")?.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
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
productReviewSigninButton?.addEventListener("click", () => {
  openAuthModal();
});
profileModalCloseButton?.addEventListener("click", closeProfileModal);
profileCancelEditButton?.addEventListener("click", () => {
  cancelProfileAddressEdit();
});
profileForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await saveProfileFromProfileModal();
});

profileAddressList?.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const editButton = target.closest("[data-address-edit]");
  const defaultButton = target.closest("[data-address-default]");
  const deleteButton = target.closest("[data-address-delete]");
  if (!editButton && !defaultButton && !deleteButton) return;

  const profile = normalizeSavedProfile(readSavedProfile(getAuthEmailAddress()));
  if (!profile?.addresses?.length) return;

  if (editButton instanceof HTMLElement) {
    const addressId = editButton.dataset.addressEdit || "";
    beginEditingProfileAddress(addressId);
    return;
  }

  if (defaultButton instanceof HTMLElement) {
    const addressId = defaultButton.dataset.addressDefault || "";
    const defaultAddress = profile.addresses.find((address) => address.id === addressId);
    if (!defaultAddress) return;

    const updatedProfile = {
      ...profile,
      name: defaultAddress.name,
      phone: defaultAddress.phone,
      defaultAddressId: defaultAddress.id,
      addresses: profile.addresses.map((address) => ({
        ...address,
        isDefault: address.id === defaultAddress.id,
      })),
    };

    saveProfileLocally(updatedProfile);
    updateProfileSummary(updatedProfile);
    renderCheckoutAddressOptions(updatedProfile, defaultAddress.id);
    populateCheckoutProfile(defaultAddress, { replace: true });
    activeCheckoutAddressId = defaultAddress.id;
    setProfileMessage("Default address updated.", "success");
    showToast("Default address updated");
    await syncProfileToServer(updatedProfile);
    await refreshAuthSessionActivity({ touchServer: true });
  }

  if (deleteButton instanceof HTMLElement) {
    const addressId = deleteButton.dataset.addressDelete || "";
    if (!window.confirm("Delete this saved address?")) return;

    const remainingAddresses = profile.addresses.filter((address) => address.id !== addressId);
    if (remainingAddresses.length === 0) {
      const clearedProfile = { name: "", phone: "", defaultAddressId: "", addresses: [] };
      try {
        localStorage.removeItem(getProfileStorageKey(getAuthEmailAddress()));
      } catch {
        // Ignore storage errors.
      }
      renderProfileAddressBook(clearedProfile);
      renderCheckoutAddressOptions(clearedProfile, "");
      activeCheckoutAddressId = "";
      setProfileMessage("Address deleted.", "neutral");
      showToast("Address deleted");
      await syncProfileToServer(clearedProfile);
      await refreshAuthSessionActivity({ touchServer: true });
      return;
    }

    const nextDefault = profile.defaultAddressId === addressId
      ? remainingAddresses[0]
      : remainingAddresses.find((address) => address.id === profile.defaultAddressId) || remainingAddresses[0];

    const updatedProfile = {
      ...profile,
      name: nextDefault.name || profile.name,
      phone: nextDefault.phone || profile.phone,
      defaultAddressId: nextDefault.id,
      addresses: remainingAddresses.map((address) => ({
        ...address,
        isDefault: address.id === nextDefault.id,
      })),
    };

    saveProfileLocally(updatedProfile);
    updateProfileSummary(updatedProfile);
    renderCheckoutAddressOptions(updatedProfile, nextDefault.id);
    populateCheckoutProfile(nextDefault, { replace: true });
    activeCheckoutAddressId = nextDefault.id;
    setProfileMessage("Address deleted.", "neutral");
    showToast("Address deleted");
    await syncProfileToServer(updatedProfile);
    await refreshAuthSessionActivity({ touchServer: true });
  }
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

["pointerdown", "keydown", "scroll", "touchstart", "focusin"].forEach((eventName) => {
  window.addEventListener(eventName, handleAuthActivity, { passive: true, capture: true });
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  if (!authUser || !authSessionToken) return;

  const lastActivity = getStoredAuthActivity();
  if (lastActivity && Date.now() - lastActivity >= AUTH_IDLE_TIMEOUT_MS) {
    handleExpiredAuthSession();
    return;
  }

  saveStoredAuthActivity(Date.now());
  scheduleAuthIdleTimeout();
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

function updateCartItemQuantity(productId, delta) {
  const product = findProduct(productId);
  if (!product || !delta) return;

  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);

  if (!item) {
    if (delta > 0) {
      cart.push({ id: productId, quantity: 1 });
    } else {
      return;
    }
  } else {
    item.quantity += delta;
    if (item.quantity <= 0) {
      const index = cart.findIndex((entry) => entry.id === productId);
      if (index >= 0) cart.splice(index, 1);
    }
  }

  saveCart(cart);
  renderCart();
  showToast(
    delta > 0
      ? `${product.name} added to cart`
      : `${product.name} removed from cart`
  );
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
    cartTotalElement.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;
  }

  if (!cartItemsContainer) return;

  if (fullItems.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-state">Your cart is currently empty.</p>';
    return;
  }

  cartItemsContainer.innerHTML = "";

  fullItems.forEach((item) => {
    const lineTotal = `₹${(item.price * item.quantity).toLocaleString("en-IN")}`;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-item-main">
        <div class="cart-item-thumb">
          <img src="${item.imageSrc}" alt="${item.name}" loading="lazy" decoding="async" />
        </div>
        <div class="cart-item-copy">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.priceText} each</div>
          <div class="cart-item-quantity-controls" aria-label="Adjust quantity for ${item.name}">
            <button class="quantity-button quantity-decrease" type="button" aria-label="Decrease quantity">&minus;</button>
            <span class="cart-item-quantity">${item.quantity}</span>
            <button class="quantity-button quantity-increase" type="button" aria-label="Increase quantity">+</button>
          </div>
        </div>
      </div>
      <div class="cart-item-side">
        <span class="cart-item-line-total">${lineTotal}</span>
        <button class="remove-item-button" type="button">Remove</button>
      </div>
    `;

    row.querySelector(".quantity-decrease")?.addEventListener("click", () => {
      updateCartItemQuantity(item.id, -1);
    });
    row.querySelector(".quantity-increase")?.addEventListener("click", () => {
      updateCartItemQuantity(item.id, 1);
    });
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

  renderProductReviews(product.id);
  resetProductReviewForm();
  updateReviewFormAccess();

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
  if (productReviewList) {
    productReviewList.innerHTML = "";
  }
  if (productReviewCount) {
    productReviewCount.textContent = "0 reviews";
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
        decoding="async"
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
              <img src="${src}" alt="" loading="lazy" decoding="async" />
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

checkoutAddressList?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !authUser) return;

  const card = target.closest("[data-checkout-address]");
  if (!(card instanceof HTMLElement)) return;

  const addressId = card.dataset.checkoutAddress || "";
  if (!addressId) return;

  const profile = normalizeSavedProfile(readSavedProfile(getAuthEmailAddress()));
  const selectedAddress = profile?.addresses?.find((address) => address.id === addressId);
  if (!selectedAddress) return;

  renderCheckoutAddressOptions(profile, selectedAddress.id);
  populateCheckoutFromAddress(selectedAddress, { replace: true });

  if (checkoutFeedback) {
    checkoutFeedback.textContent = `Using ${selectedAddress.label || "the selected"} saved address.`;
  }
  if (checkoutAddressHint) {
    checkoutAddressHint.textContent = `Using saved address: ${formatSavedAddressLabel(selectedAddress)}.`;
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
productReviewForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!activeModalProductId) return;
  saveProductReview(activeModalProductId);
});
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

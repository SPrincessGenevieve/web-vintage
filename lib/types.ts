export interface StepOneRegisterType {
  email: string;
  fullname: string;
  mobileNumber: string;
  birthDate: string;
}

export interface StepTwoRegisterType {
  streetAddress: string;
  city: string;
  county: string;
  postalCode: string;
  country: string;
}

export interface StepThreeRegisterType {
  idType: string;
  image: File | null;
  feedback: string;
}

export interface StepTwoInviteType {
  firstname: string;
  lastname: string;
  birthDate: string | undefined;
  code: string;
  phoneNumber: string;
  email: string;
}

export interface StepThreeInviteType {
  depositAmount: number;
  holdinPeriod: string;
  isFirstTime: string;
  region: string;
}

export interface VintExCardT {
  id: number;
  name: string;
  wine_images: string[];
  is_very_special: boolean;
  vintage_range: string;
  price_range: string;
  maximum_price: number;
  fromm: string;
  oldest_vintage: number;
  annual_production: number;
  default_case_size: number;
  grapes: string;
}

export interface SpecialVolumesCardT {
  id: number;
  name: string;
  wine_images: string[];
  price: number;
  fromm: string;
  vintage: number;
  bottle_size: string[];
  annual_production: number;
  default_case_size: number;
}

export interface SpecialBundleCardT {
  id: number;
  name: string;
  vintage: number | null;
  quantity: number;
  market_value: number;
  case_size: number;
  winery: string;
  region: string;
  grapes: string;
  grape_variety: string;
  fromm: string;
  image: string;
  special_id: number | null;
  is_assortment: boolean;
  sub_header: string;
}

export interface RareCardT {
  investment_id: number;
  case_size: number;
  quantity: number;
  market_value: number;
  is_owner: boolean;
  wine_vintage_details: {
    id: number;
    name: string;
    lwin11: string;
    vintage: number;
    rp_score: string;
    release_price: string | number;
    rp_released: string;
    rp_tasting_notes: string;
    rp_reviewer: string;
    holding_years: string;
    liv_ex_value: number;
    is_listed: boolean;
    size: string;
    status: string;
    drinking_window: string;
    market_value: string;
    tags: string;
    processed_case: number;
    bottle_size: string;
    mean: number;
    median: number;
    is_user_investment: boolean;
  };
  wine_parent: {
    id: number;
    lwin7: string;
    name: string;
    fromm: string;
    red_wine: string;
    grapes: string;
    pair_with: string;
    region_of_appellation: string;
    alcohol_abv: string;
    sweetness: string;
    blend: string;
    maturation: string;
    ownership: string;
    closure_type: string;
    grape_variety: string;
    region: string;
    winery: string;
    images: string[];
    annual_production: number;
    default_case_size: number;
  };
  basket_details: BasketDetailsT | null;
  basket_items: BasketItemsT | null;
}

export interface BasketDetailsT {
  id: number;
  name: string;
  quantity: number;
  market_value: number;
  case_size: number;
  winery: string;
  region: string;
  grape_variety: string;
  image: string | string[];
  special_id: string;
  is_assortment: boolean;
}

export interface BasketItemsT {
  id: number;
  quantity: number;
  wine_parent_id: number;
  case_size: number;
  basket_bottle_size: string;
  wine_vintage: {
    id: number;
    lwin11: string;
    name: string;
    vintage: number;
    wine: number;
    rp_score: string;
    rp_released: string;
    rp_tasting_notes: string;
    rp_reviewer: string;
    holding_years: string;
    liv_ex_value: string;
    is_listed: boolean;
    size: string;
    status: string;
    drinking_window: string;
    market_value: string;
    tags: string;
    processed_case: number;
    bottle_size: string;
    oldest_vintage: number;
    mean: string;
    median: string;
    is_user_investment: boolean;
    is_very_special: boolean;
  };
  wine_images: string[];
}

export interface WineResultDetailT {
  id: number;
  lwin11: string;
  name: string;
  vintage: number;
  release_price: string;
  wine: number;
  rp_score: string;
  rp_released: string;
  rp_tasting_notes: string;
  rp_reviewer: string;
  holding_years: string;
  liv_ex_value: string;
  is_listed: boolean;
  size: string;
  status: string;
  drinking_window: string;
  market_value: string;
  tags: string;
  processed_case: number;
  bottle_size: string;
  oldest_vintage: number;
  mean: string;
  median: string;
  is_user_investment: boolean;
  is_very_special: boolean;
  available_case_size: number[];
}

export interface VintexResultsT {
  id: number;
  lwin11: string;
  name: string;
  vintage: number;
  release_price: string;
  wine: number;
  rp_score: string;
  rp_released: string;
  rp_tasting_notes: string;
  rp_reviewer: string;
  holding_years: string;
  liv_ex_value: string;
  is_listed: boolean;
  size: string;
  status: string;
  drinking_window: string;
  market_value: string;
  tags: string;
  processed_case: number;
  bottle_size: string;
  oldest_vintage: number;
  mean: string;
  median: string;
  is_user_investment: boolean;
  is_very_special: boolean;
  available_case_size: number[];
  is_unavailable: boolean;
  get_notified: boolean;
}

export interface WineDetailsT {
  id: number;
  lwin7: string;
  name: string;
  fromm: string;
  red_wine: string;
  grapes: string;
  pair_with: string;
  region_of_appellation: string;
  alcohol_abv: string;
  sweetness: string;
  blend: string;
  ownership: string;
  closure_type: string;
  grape_variety: string;
  region: string;
  winery: string;
  wine_images: string[];
  oldest_vintage: number;
  maximum_price: number;
  annual_production: number;
  default_case_size: number;
}

export interface SpecialVolumeWineDetailsT {
  id: number;
  lwin7: string;
  name: string;
  fromm: string;
  red_wine: string;
  grapes: string;
  pair_with: string;
  region_of_appellation: string;
  alcohol_abv: string;
  sweetness: string;
  blend: string;
  ownership: string;
  closure_type: string;
  grape_variety: string;
  region: string;
  winery: string;
  wine_images: string[];
  vintage: number;
  price: number;
  annual_production: number;
  default_case_size: number;
}

export interface DefaultVintageT {
  price: number;
  vintage_year: number;
  case_size: number;
  wine_vintage: {
    id: number;
    is_processed: boolean;
    lwin11: string;
    name: string;
    description: string;
    vintage: number;
    wine: number;
    rp_score: string;
    rp_released: string;
    rp_tasting_notes: string;
    rp_reviewer: string;
    holding_years: string;
    liv_ex_value: number;
    is_listed: boolean;
    size: string;
    status: string;
    drinking_window: string;
    market_value: number;
    tags: string;
    most_sold_cases: number[];
    available_case_size: number[];
    release_price: number;
    mean: number;
    median: number;
    processed_case: number;
    is_init: boolean;
    bottle_size: string;
    is_very_special: boolean;
    is_flagged: boolean;
    flagged_price: null | number;
  };
}

export interface VintexDetailsT {
  results: VintexResultsT[];
  wine_details: WineDetailsT;
  default_vintage: DefaultVintageT;
}

export interface CartItemT {
  id: number | string;
  case_size: number;
  quantity: number;
  stock_wine_vintage: StockWineVintageT | null;
  user_investment_wine_vintage: UserInvestmentWineVintage | null;
  short_description: string;
  images: string | string[];
  is_special_volumes: boolean;
  basket: CartBasketT | null;
  basket_items: BasketItemsT[] | null;
  is_available: boolean;
  photo_request: boolean;
  wine_name: string;
}

export interface BasketT {
  basket: CartBasketT | null;
  basket_items: BasketItemsT[] | null;
}

export interface PortfolioBasketDetailsT {
  id: string;
  wine_name: string;
  quantity: number;
  bottle_size: string;
  market_price: number;
  case_size: number;
}

export interface PortfolioDataT {
  id: number;
  wine_name: string;
  region: string;
  grape: string;
  vintage: number;
  case_size: number;
  quantity: number;
  bottle_size: string;
  market_price: number;
  price_loss: string;
  proce_loss_percentage: string;
  holding_years: number;
  status: string;
  image: string;
  critic_score: number;
  lwin11: string;
  purchase_price: string;
  sub_account: string;
  type: string;
  location: string;
  basket_items: PortfolioBasketDetailsT[];
}

export interface CartBasketT {
  id: number;
  name: string;
  vintage: number | null;
  quantity: number;
  market_value: number;
  case_size: number;
  winery: string;
  region: string;
  grapes: string;
  grape_variety: string;
  fromm: string;
  image: string;
  special_id: number | null;
  is_assortment: boolean;
  sub_header: string;
}

export interface UserInvestmentWineVintage {
  investment_id: number;
  name: string;
  vintage: number;
  rp_score: string;
  rp_released: string;
  rp_tasting_notes: string;
  rp_reviewer: string;
  holding_years: string;
  liv_ex_value: number;
  is_listed: boolean;
  size: string;
  status: string;
  drinking_window: string;
  market_value: string;
  tags: string;
  processed_case: number;
  bottle_size: string;
  mean: number;
  median: number;
  is_user_investment: boolean;
}

export interface StockWineVintage {
  id: number;
  lwin11: string;
  name: string;
  vintage: number;
  release_price: string;
  wine: number;
  rp_score: string;
  rp_released: string;
  rp_tasting_notes: string;
  rp_reviewer: string;
  holding_years: string;
  liv_ex_value: string;
  is_listed: boolean;
  size: string;
  status: string;
  drinking_window: string;
  market_value: string;
  tags: string;
  processed_case: number;
  bottle_size: string;
  oldest_vintage: number;
  mean: string;
  median: string;
  is_user_investment: boolean;
  is_very_special: boolean;
  available_case_size: number[];
}

export interface StockWineVintageT {
  investment_id: number;
  case_size: number;
  quantity: number;
  market_value: number;
  is_owner: boolean;
  id: number;
  name: string;
  lwin11: string;
  vintage: number;
  rp_score: string;
  release_price: string;
  rp_released: string;
  rp_tasting_notes: string;
  rp_reviewer: string;
  holding_years: string;
  liv_ex_value: number;
  is_listed: boolean;
  size: string;
  status: string;
  drinking_window: string;
  tags: string;
  processed_case: number;
  bottle_size: string;
  mean: number;
  median: number;
  is_user_investment: boolean;
}

export interface PortfolioT {
  id: number;
  investment: string;
  wine_vintage: number;
  quantity: number;
  case_size: number;
  market_value: string;
  profit_lost: number;
  profit_lost_by_percent: number;
  investment_status: "owned" | "pending" | "sold";
  quantity_to_sell: number;
  quantity_to_transfer: number;
  bottle_size: string;
  sub_account: string;
  wine_parent: WineDetailsT;
  wine_vintage_details: VintexResultsT & {
    available_case_size: number[];
  };
  created_at: string;
  basket_details: {
    id: number;
    name: string;
    image: string;
    winery: string;
    region: string;
    fromm: string;
    grape_variety: string;
    grapes: string;
    special_id: string;
    is_assortment: boolean;
  } | null;
  basket_items: PortfolioBasketItemT[];
  is_special_volumes: boolean;
  inventory_details: any[];
  invested_price_per_bottle: number;
  original_quantity: number;
  original_price_per_bottle: string;
  investment_sub_type: "investment" | "trade" | "storage";
}

export interface PortfolioBasketItemT {
  id: number;
  quantity: number;
  wine_parent_id: number;
  case_size: number;
  basket_bottle_size: string;
  wine_vintage: VintexResultsT & {
    available_case_size: number[];
  };
  wine_images: string[];
  wine_parent_name: string;
}

export interface WineRareVintageDetails {
  id: number;
  name: string;
  lwin11: string;
  vintage: number;
  rp_score: string;
  release_price: string;
  rp_released: string;
  rp_tasting_notes: string;
  rp_reviewer: string;
  holding_years: string;
  liv_ex_value: number;
  is_listed: boolean;
  size: string;
  status: string;
  drinking_window: string;
  market_value: string;
  tags: string;
  processed_case: number;
  bottle_size: string;
  mean: number;
  median: number;
  is_user_investment: boolean;
}
export interface WineRareParentT {
  id: number;
  lwin7: string;
  name: string;
  fromm: string;
  red_wine: string;
  grapes: string;
  pair_with: string;
  region_of_appellation: string;
  alcohol_abv: string;
  sweetness: string;
  blend: string;
  maturation: string;
  ownership: string;
  closure_type: string;
  grape_variety: string;
  region: string;
  winery: string;
  images: string;
  annual_production: number;
  default_case_size: number;
}

export interface WineRareBasketDetailT {
  id: number;
  name: string;
  image: string;
  winery: string;
  region: string;
  fromm: string;
  grapes: string;
  grape_variety: string;
  special_id: string;
  is_assortment: boolean;
}

export interface WineRareResultsT {
  investment_id: number;
  case_size: number;
  quantity: number;
  market_value: number;
  is_owner: boolean;
  wine_vintage_details: WineRareVintageDetails | null;
  wine_parent: WineRareParentT | null;
  basket_details: WineRareBasketDetailT | null;
  basket_items: BasketItemsT[] | null;
}

export interface RareT {
  results: WineRareResultsT;
}

export interface SpecialVolumeT {
  results: WineResultDetailT[];
  wine_details: SpecialVolumeWineDetailsT;
}

export interface SpecialBundleParentT {
  id: number;
  name: string;
  vintage: number | null;
  quantity: number;
  market_value: number;
  case_size: number;
  winery: string;
  region: string;
  grapes: string;
  grape_variety: string;
  fromm: string;
  image: string;
  special_id: number | null;
  is_assortment: boolean;
  sub_header: string;
}

export interface SpecialBundleT {
  results: PortfolioBasketItemT[];
  basket_details: SpecialBundleParentT;
}

export interface PaymentMethodT {
  last_code: string;
  exp: string;
  img: string;
  card_type: string;
  is_default: boolean;
}

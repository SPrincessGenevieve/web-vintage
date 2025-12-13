import mywinecellar from "@/public/myPortfolio";
import myportfolio from "@/public/myPortfolio";
import {
  Briefcase,
  CircleAlert,
  Clock,
  ConciergeBell,
  LayoutDashboard,
  Store,
  TrendingDown,
} from "lucide-react";

export const countries = [
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "United States", value: "United States" },
  { label: "Albania", value: "Albania" },
  { label: "Andorra", value: "Andorra" },
  { label: "Austria", value: "Austria" },
  { label: "Belarus", value: "Belarus" },
  { label: "Belgium", value: "Belgium" },
  { label: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
  { label: "Bulgaria", value: "Bulgaria" },
  { label: "Croatia", value: "Croatia" },
  { label: "Cyprus", value: "Cyprus" },
  { label: "Czech Republic", value: "Czech Republic" },
  { label: "Denmark", value: "Denmark" },
  { label: "Estonia", value: "Estonia" },
  { label: "Finland", value: "Finland" },
  { label: "France", value: "France" },
  { label: "Germany", value: "Germany" },
  { label: "Greece", value: "Greece" },
  { label: "Hungary", value: "Hungary" },
  { label: "Iceland", value: "Iceland" },
  { label: "Ireland", value: "Ireland" },
  { label: "Italy", value: "Italy" },
  { label: "Kosovo", value: "Kosovo" },
  { label: "Latvia", value: "Latvia" },
  { label: "Liechtenstein", value: "Liechtenstein" },
  { label: "Lithuania", value: "Lithuania" },
  { label: "Luxembourg", value: "Luxembourg" },
  { label: "Malta", value: "Malta" },
  { label: "Moldova", value: "Moldova" },
  { label: "Monaco", value: "Monaco" },
  { label: "Montenegro", value: "Montenegro" },
  { label: "Netherlands", value: "Netherlands" },
  { label: "North Macedonia", value: "North Macedonia" },
  { label: "Norway", value: "Norway" },
  { label: "Poland", value: "Poland" },
  { label: "Portugal", value: "Portugal" },
  { label: "Romania", value: "Romania" },
  { label: "San Marino", value: "San Marino" },
  { label: "Serbia", value: "Serbia" },
  { label: "Slovakia", value: "Slovakia" },
  { label: "Slovenia", value: "Slovenia" },
  { label: "Spain", value: "Spain" },
  { label: "Sweden", value: "Sweden" },
  { label: "Switzerland", value: "Switzerland" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "Vatican City", value: "Vatican City" },
];

export const id_type = [
  {
    label: "Passport",
    value: "Passport",
  },
  {
    label: "Driver's License",
    value: "Driver's License",
  },
  {
    label: "National ID",
    value: "National ID",
  },
];

export const feedback = [
  {
    label: "Existing Member",
    value: "Existing Member",
  },
  {
    label: "Partner of Ours",
    value: "Partner of Ours",
  },
  {
    label: "Search Engine",
    value: "Search Engine",
  },
  {
    label: "Publication / Press Article",
    value: "Publication / Press Article",
  },
];

export const country_list = [
  { label: "Afghanistan", flag: "🇦🇫", code: "AF", value: "+93" },
  { label: "Åland Islands", flag: "🇦🇽", code: "AX", value: "+358" },
  { label: "Albania", flag: "🇦🇱", code: "AL", value: "+355" },
  { label: "Algeria", flag: "🇩🇿", code: "DZ", value: "+213" },
  { label: "American Samoa", flag: "🇦🇸", code: "AS", value: "+1684" },
  { label: "Andorra", flag: "🇦🇩", code: "AD", value: "+376" },
  { label: "Angola", flag: "🇦🇴", code: "AO", value: "+244" },
  { label: "Anguilla", flag: "🇦🇮", code: "AI", value: "+1264" },
  { label: "Antarctica", flag: "🇦🇶", code: "AQ", value: "+672" },
  { label: "Antigua and Barbuda", flag: "🇦🇬", code: "AG", value: "+1268" },
  { label: "Argentina", flag: "🇦🇷", code: "AR", value: "+54" },
  { label: "Armenia", flag: "🇦🇲", code: "AM", value: "+374" },
  { label: "Aruba", flag: "🇦🇼", code: "AW", value: "+297" },
  { label: "Australia", flag: "🇦🇺", code: "AU", value: "+61" },
  { label: "Austria", flag: "🇦🇹", code: "AT", value: "+43" },
  { label: "Azerbaijan", flag: "🇦🇿", code: "AZ", value: "+994" },
  { label: "Bahamas", flag: "🇧🇸", code: "BS", value: "+1242" },
  { label: "Bahrain", flag: "🇧🇭", code: "BH", value: "+973" },
  { label: "Bangladesh", flag: "🇧🇩", code: "BD", value: "+880" },
  { label: "Barbados", flag: "🇧🇧", code: "BB", value: "+1246" },
  { label: "Belarus", flag: "🇧🇾", code: "BY", value: "+375" },
  { label: "Belgium", flag: "🇧🇪", code: "BE", value: "+32" },
  { label: "Belize", flag: "🇧🇿", code: "BZ", value: "+501" },
  { label: "Benin", flag: "🇧🇯", code: "BJ", value: "+229" },
  { label: "Bermuda", flag: "🇧🇲", code: "BM", value: "+1441" },
  { label: "Bhutan", flag: "🇧🇹", code: "BT", value: "+975" },
  {
    label: "Bolivia, Plurinational State of bolivia",
    flag: "🇧🇴",
    code: "BO",
    value: "+591",
  },
  { label: "Bosnia and Herzegovina", flag: "🇧🇦", code: "BA", value: "+387" },
  { label: "Botswana", flag: "🇧🇼", code: "BW", value: "+267" },
  { label: "Bouvet Island", flag: "🇧🇻", code: "BV", value: "+47" },
  { label: "Brazil", flag: "🇧🇷", code: "BR", value: "+55" },
  {
    label: "British Indian Ocean Territory",
    flag: "🇮🇴",
    code: "IO",
    value: "+246",
  },
  { label: "Brunei Darussalam", flag: "🇧🇳", code: "BN", value: "+673" },
  { label: "Bulgaria", flag: "🇧🇬", code: "BG", value: "+359" },
  { label: "Burkina Faso", flag: "🇧🇫", code: "BF", value: "+226" },
  { label: "Burundi", flag: "🇧🇮", code: "BI", value: "+257" },
  { label: "Cambodia", flag: "🇰🇭", code: "KH", value: "+855" },
  { label: "Cameroon", flag: "🇨🇲", code: "CM", value: "+237" },
  { label: "Canada", flag: "🇨🇦", code: "CA", value: "+1" },
  { label: "Cape Verde", flag: "🇨🇻", code: "CV", value: "+238" },
  { label: "Cayman Islands", flag: "🇰🇾", code: "KY", value: "+345" },
  {
    label: "Central African Republic",
    flag: "🇨🇫",
    code: "CF",
    value: "+236",
  },
  { label: "Chad", flag: "🇹🇩", code: "TD", value: "+235" },
  { label: "Chile", flag: "🇨🇱", code: "CL", value: "+56" },
  { label: "China", flag: "🇨🇳", code: "CN", value: "+86" },
  { label: "Christmas Island", flag: "🇨🇽", code: "CX", value: "+61" },
  { label: "Cocos (Keeling) Islands", flag: "🇨🇨", code: "CC", value: "+61" },
  { label: "Colombia", flag: "🇨🇴", code: "CO", value: "+57" },
  { label: "Comoros", flag: "🇰🇲", code: "KM", value: "+269" },
  { label: "Congo", flag: "🇨🇬", code: "CG", value: "+242" },
  {
    label: "Congo, The Democratic Republic of the Congo",
    flag: "🇨🇩",
    code: "CD",
    value: "+243",
  },
  { label: "Cook Islands", flag: "🇨🇰", code: "CK", value: "+682" },
  { label: "Costa Rica", flag: "🇨🇷", code: "CR", value: "+506" },
  { label: "Cote d'Ivoire", flag: "🇨🇮", code: "CI", value: "+225" },
  { label: "Croatia", flag: "🇭🇷", code: "HR", value: "+385" },
  { label: "Cuba", flag: "🇨🇺", code: "CU", value: "+53" },
  { label: "Cyprus", flag: "🇨🇾", code: "CY", value: "+357" },
  { label: "Czech Republic", flag: "🇨🇿", code: "CZ", value: "+420" },
  { label: "Denmark", flag: "🇩🇰", code: "DK", value: "+45" },
  { label: "Djibouti", flag: "🇩🇯", code: "DJ", value: "+253" },
  { label: "Dominica", flag: "🇩🇲", code: "DM", value: "+1767" },
  { label: "Dominican Republic", flag: "🇩🇴", code: "DO", value: "+1849" },
  { label: "Ecuador", flag: "🇪🇨", code: "EC", value: "+593" },
  { label: "Egypt", flag: "🇪🇬", code: "EG", value: "+20" },
  { label: "El Salvador", flag: "🇸🇻", code: "SV", value: "+503" },
  { label: "Equatorial Guinea", flag: "🇬🇶", code: "GQ", value: "+240" },
  { label: "Eritrea", flag: "🇪🇷", code: "ER", value: "+291" },
  { label: "Estonia", flag: "🇪🇪", code: "EE", value: "+372" },
  { label: "Ethiopia", flag: "🇪🇹", code: "ET", value: "+251" },
  {
    label: "Falkland Islands (Malvinas)",
    flag: "🇫🇰",
    code: "FK",
    value: "+500",
  },
  { label: "Faroe Islands", flag: "🇫🇴", code: "FO", value: "+298" },
  { label: "Fiji", flag: "🇫🇯", code: "FJ", value: "+679" },
  { label: "Finland", flag: "🇫🇮", code: "FI", value: "+358" },
  { label: "France", flag: "🇫🇷", code: "FR", value: "+33" },
  { label: "French Guiana", flag: "🇬🇫", code: "GF", value: "+594" },
  { label: "French Polynesia", flag: "🇵🇫", code: "PF", value: "+689" },
  {
    label: "French Southern Territories",
    flag: "🇹🇫",
    code: "TF",
    value: "+262",
  },
  { label: "Gabon", flag: "🇬🇦", code: "GA", value: "+241" },
  { label: "Gambia", flag: "🇬🇲", code: "GM", value: "+220" },
  { label: "Georgia", flag: "🇬🇪", code: "GE", value: "+995" },
  { label: "Germany", flag: "🇩🇪", code: "DE", value: "+49" },
  { label: "Ghana", flag: "🇬🇭", code: "GH", value: "+233" },
  { label: "Gibraltar", flag: "🇬🇮", code: "GI", value: "+350" },
  { label: "Greece", flag: "🇬🇷", code: "GR", value: "+30" },
  { label: "Greenland", flag: "🇬🇱", code: "GL", value: "+299" },
  { label: "Grenada", flag: "🇬🇩", code: "GD", value: "+1473" },
  { label: "Guadeloupe", flag: "🇬🇵", code: "GP", value: "+590" },
  { label: "Guam", flag: "🇬🇺", code: "GU", value: "+1671" },
  { label: "Guatemala", flag: "🇬🇹", code: "GT", value: "+502" },
  { label: "Guernsey", flag: "🇬🇬", code: "GG", value: "+44" },
  { label: "Guinea", flag: "🇬🇳", code: "GN", value: "+224" },
  { label: "Guinea-Bissau", flag: "🇬🇼", code: "GW", value: "+245" },
  { label: "Guyana", flag: "🇬🇾", code: "GY", value: "+592" },
  { label: "Haiti", flag: "🇭🇹", code: "HT", value: "+509" },
  {
    label: "Heard Island and Mcdonald Islands",
    flag: "🇭🇲",
    code: "HM",
    value: "+672",
  },
  {
    label: "Holy See (Vatican City State)",
    flag: "🇻🇦",
    code: "VA",
    value: "+379",
  },
  { label: "Honduras", flag: "🇭🇳", code: "HN", value: "+504" },
  { label: "Hong Kong", flag: "🇭🇰", code: "HK", value: "+852" },
  { label: "Hungary", flag: "🇭🇺", code: "HU", value: "+36" },
  { label: "Iceland", flag: "🇮🇸", code: "IS", value: "+354" },
  { label: "India", flag: "🇮🇳", code: "IN", value: "+91" },
  { label: "Indonesia", flag: "🇮🇩", code: "ID", value: "+62" },
  {
    label: "Iran, Islamic Republic of Persian Gulf",
    flag: "🇮🇷",
    code: "IR",
    value: "+98",
  },
  { label: "Iraq", flag: "🇮🇶", code: "IQ", value: "+964" },
  { label: "Ireland", flag: "🇮🇪", code: "IE", value: "+353" },
  { label: "Isle of Man", flag: "🇮🇲", code: "IM", value: "+44" },
  { label: "Israel", flag: "🇮🇱", code: "IL", value: "+972" },
  { label: "Italy", flag: "🇮🇹", code: "IT", value: "+39" },
  { label: "Jamaica", flag: "🇯🇲", code: "JM", value: "+1876" },
  { label: "Japan", flag: "🇯🇵", code: "JP", value: "+81" },
  { label: "Jersey", flag: "🇯🇪", code: "JE", value: "+44" },
  { label: "Jordan", flag: "🇯🇴", code: "JO", value: "+962" },
  { label: "Kazakhstan", flag: "🇰🇿", code: "KZ", value: "+7" },
  { label: "Kenya", flag: "🇰🇪", code: "KE", value: "+254" },
  { label: "Kiribati", flag: "🇰🇮", code: "KI", value: "+686" },
  {
    label: "Korea, Democratic People's Republic of Korea",
    flag: "🇰🇵",
    code: "KP",
    value: "+850",
  },
  {
    label: "Korea, Republic of South Korea",
    flag: "🇰🇷",
    code: "KR",
    value: "+82",
  },
  { label: "Kosovo", flag: "🇽🇰", code: "XK", value: "+383" },
  { label: "Kuwait", flag: "🇰🇼", code: "KW", value: "+965" },
  { label: "Kyrgyzstan", flag: "🇰🇬", code: "KG", value: "+996" },
  { label: "Laos", flag: "🇱🇦", code: "LA", value: "+856" },
  { label: "Latvia", flag: "🇱🇻", code: "LV", value: "+371" },
  { label: "Lebanon", flag: "🇱🇧", code: "LB", value: "+961" },
  { label: "Lesotho", flag: "🇱🇸", code: "LS", value: "+266" },
  { label: "Liberia", flag: "🇱🇷", code: "LR", value: "+231" },
  { label: "Libyan Arab Jamahiriya", flag: "🇱🇾", code: "LY", value: "+218" },
  { label: "Liechtenstein", flag: "🇱🇮", code: "LI", value: "+423" },
  { label: "Lithuania", flag: "🇱🇹", code: "LT", value: "+370" },
  { label: "Luxembourg", flag: "🇱🇺", code: "LU", value: "+352" },
  { label: "Macao", flag: "🇲🇴", code: "MO", value: "+853" },
  { label: "Macedonia", flag: "🇲🇰", code: "MK", value: "+389" },
  { label: "Madagascar", flag: "🇲🇬", code: "MG", value: "+261" },
  { label: "Malawi", flag: "🇲🇼", code: "MW", value: "+265" },
  { label: "Malaysia", flag: "🇲🇾", code: "MY", value: "+60" },
  { label: "Maldives", flag: "🇲🇻", code: "MV", value: "+960" },
  { label: "Mali", flag: "🇲🇱", code: "ML", value: "+223" },
  { label: "Malta", flag: "🇲🇹", code: "MT", value: "+356" },
  { label: "Marshall Islands", flag: "🇲🇭", code: "MH", value: "+692" },
  { label: "Martinique", flag: "🇲🇶", code: "MQ", value: "+596" },
  { label: "Mauritania", flag: "🇲🇷", code: "MR", value: "+222" },
  { label: "Mauritius", flag: "🇲🇺", code: "MU", value: "+230" },
  { label: "Mayotte", flag: "🇾🇹", code: "YT", value: "+262" },
  { label: "Mexico", flag: "🇲🇽", code: "MX", value: "+52" },
  {
    label: "Micronesia, Federated States of Micronesia",
    flag: "🇫🇲",
    code: "FM",
    value: "+691",
  },
  { label: "Moldova", flag: "🇲🇩", code: "MD", value: "+373" },
  { label: "Monaco", flag: "🇲🇨", code: "MC", value: "+377" },
  { label: "Mongolia", flag: "🇲🇳", code: "MN", value: "+976" },
  { label: "Montenegro", flag: "🇲🇪", code: "ME", value: "+382" },
  { label: "Montserrat", flag: "🇲🇸", code: "MS", value: "+1664" },
  { label: "Morocco", flag: "🇲🇦", code: "MA", value: "+212" },
  { label: "Mozambique", flag: "🇲🇿", code: "MZ", value: "+258" },
  { label: "Myanmar", flag: "🇲🇲", code: "MM", value: "+95" },
  { label: "Namibia", flag: "🇳🇦", code: "NA", value: "+264" },
  { label: "Nauru", flag: "🇳🇷", code: "NR", value: "+674" },
  { label: "Nepal", flag: "🇳🇵", code: "NP", value: "+977" },
  { label: "Netherlands", flag: "🇳🇱", code: "NL", value: "+31" },
  { label: "Netherlands Antilles", flag: "", code: "AN", value: "+599" },
  { label: "New Caledonia", flag: "🇳🇨", code: "NC", value: "+687" },
  { label: "New Zealand", flag: "🇳🇿", code: "NZ", value: "+64" },
  { label: "Nicaragua", flag: "🇳🇮", code: "NI", value: "+505" },
  { label: "Niger", flag: "🇳🇪", code: "NE", value: "+227" },
  { label: "Nigeria", flag: "🇳🇬", code: "NG", value: "+234" },
  { label: "Niue", flag: "🇳🇺", code: "NU", value: "+683" },
  { label: "Norfolk Island", flag: "🇳🇫", code: "NF", value: "+672" },
  {
    label: "Northern Mariana Islands",
    flag: "🇲🇵",
    code: "MP",
    value: "+1670",
  },
  { label: "Norway", flag: "🇳🇴", code: "NO", value: "+47" },
  { label: "Oman", flag: "🇴🇲", code: "OM", value: "+968" },
  { label: "Pakistan", flag: "🇵🇰", code: "PK", value: "+92" },
  { label: "Palau", flag: "🇵🇼", code: "PW", value: "+680" },
  {
    label: "Palestinian Territory, Occupied",
    flag: "🇵🇸",
    code: "PS",
    value: "+970",
  },
  { label: "Panama", flag: "🇵🇦", code: "PA", value: "+507" },
  { label: "Papua New Guinea", flag: "🇵🇬", code: "PG", value: "+675" },
  { label: "Paraguay", flag: "🇵🇾", code: "PY", value: "+595" },
  { label: "Peru", flag: "🇵🇪", code: "PE", value: "+51" },
  { label: "Philippines", flag: "🇵🇭", code: "PH", value: "+63" },
  { label: "Pitcairn", flag: "🇵🇳", code: "PN", value: "+64" },
  { label: "Poland", flag: "🇵🇱", code: "PL", value: "+48" },
  { label: "Portugal", flag: "🇵🇹", code: "PT", value: "+351" },
  { label: "Puerto Rico", flag: "🇵🇷", code: "PR", value: "+1939" },
  { label: "Qatar", flag: "🇶🇦", code: "QA", value: "+974" },
  { label: "Romania", flag: "🇷🇴", code: "RO", value: "+40" },
  { label: "Russia", flag: "🇷🇺", code: "RU", value: "+7" },
  { label: "Rwanda", flag: "🇷🇼", code: "RW", value: "+250" },
  { label: "Reunion", flag: "🇷🇪", code: "RE", value: "+262" },
  { label: "Saint Barthelemy", flag: "🇧🇱", code: "BL", value: "+590" },
  {
    label: "Saint Helena, Ascension and Tristan Da Cunha",
    flag: "🇸🇭",
    code: "SH",
    value: "+290",
  },
  { label: "Saint Kitts and Nevis", flag: "🇰🇳", code: "KN", value: "+1869" },
  { label: "Saint Lucia", flag: "🇱🇨", code: "LC", value: "+1758" },
  { label: "Saint Martin", flag: "🇲🇫", code: "MF", value: "+590" },
  {
    label: "Saint Pierre and Miquelon",
    flag: "🇵🇲",
    code: "PM",
    value: "+508",
  },
  {
    label: "Saint Vincent and the Grenadines",
    flag: "🇻🇨",
    code: "VC",
    value: "+1784",
  },
  { label: "Samoa", flag: "🇼🇸", code: "WS", value: "+685" },
  { label: "San Marino", flag: "🇸🇲", code: "SM", value: "+378" },
  { label: "Sao Tome and Principe", flag: "🇸🇹", code: "ST", value: "+239" },
  { label: "Saudi Arabia", flag: "🇸🇦", code: "SA", value: "+966" },
  { label: "Senegal", flag: "🇸🇳", code: "SN", value: "+221" },
  { label: "Serbia", flag: "🇷🇸", code: "RS", value: "+381" },
  { label: "Seychelles", flag: "🇸🇨", code: "SC", value: "+248" },
  { label: "Sierra Leone", flag: "🇸🇱", code: "SL", value: "+232" },
  { label: "Singapore", flag: "🇸🇬", code: "SG", value: "+65" },
  { label: "Slovakia", flag: "🇸🇰", code: "SK", value: "+421" },
  { label: "Slovenia", flag: "🇸🇮", code: "SI", value: "+386" },
  { label: "Solomon Islands", flag: "🇸🇧", code: "SB", value: "+677" },
  { label: "Somalia", flag: "🇸🇴", code: "SO", value: "+252" },
  { label: "South Africa", flag: "🇿🇦", code: "ZA", value: "+27" },
  { label: "South Sudan", flag: "🇸🇸", code: "SS", value: "+211" },
  {
    label: "South Georgia and the South Sandwich Islands",
    flag: "🇬🇸",
    code: "GS",
    value: "+500",
  },
  { label: "Spain", flag: "🇪🇸", code: "ES", value: "+34" },
  { label: "Sri Lanka", flag: "🇱🇰", code: "LK", value: "+94" },
  { label: "Sudan", flag: "🇸🇩", code: "SD", value: "+249" },
  { label: "Suriname", flag: "🇸🇷", code: "SR", value: "+597" },
  { label: "Svalbard and Jan Mayen", flag: "🇸🇯", code: "SJ", value: "+47" },
  { label: "Eswatini", flag: "🇸🇿", code: "SZ", value: "+268" },
  { label: "Sweden", flag: "🇸🇪", code: "SE", value: "+46" },
  { label: "Switzerland", flag: "🇨🇭", code: "CH", value: "+41" },
  { label: "Syrian Arab Republic", flag: "🇸🇾", code: "SY", value: "+963" },
  { label: "Taiwan", flag: "🇹🇼", code: "TW", value: "+886" },
  { label: "Tajikistan", flag: "🇹🇯", code: "TJ", value: "+992" },
  {
    label: "Tanzania, United Republic of Tanzania",
    flag: "🇹🇿",
    code: "TZ",
    value: "+255",
  },
  { label: "Thailand", flag: "🇹🇭", code: "TH", value: "+66" },
  { label: "Timor-Leste", flag: "🇹🇱", code: "TL", value: "+670" },
  { label: "Togo", flag: "🇹🇬", code: "TG", value: "+228" },
  { label: "Tokelau", flag: "🇹🇰", code: "TK", value: "+690" },
  { label: "Tonga", flag: "🇹🇴", code: "TO", value: "+676" },
  { label: "Trinidad and Tobago", flag: "🇹🇹", code: "TT", value: "+1868" },
  { label: "Tunisia", flag: "🇹🇳", code: "TN", value: "+216" },
  { label: "Turkey", flag: "🇹🇷", code: "TR", value: "+90" },
  { label: "Turkmenistan", flag: "🇹🇲", code: "TM", value: "+993" },
  {
    label: "Turks and Caicos Islands",
    flag: "🇹🇨",
    code: "TC",
    value: "+1649",
  },
  { label: "Tuvalu", flag: "🇹🇻", code: "TV", value: "+688" },
  { label: "Uganda", flag: "🇺🇬", code: "UG", value: "+256" },
  { label: "Ukraine", flag: "🇺🇦", code: "UA", value: "+380" },
  { label: "United Arab Emirates", flag: "🇦🇪", code: "AE", value: "+971" },
  { label: "United Kingdom", flag: "🇬🇧", code: "GB", value: "+44" },
  { label: "United States", flag: "🇺🇸", code: "US", value: "+1" },
  { label: "Uruguay", flag: "🇺🇾", code: "UY", value: "+598" },
  { label: "Uzbekistan", flag: "🇺🇿", code: "UZ", value: "+998" },
  { label: "Vanuatu", flag: "🇻🇺", code: "VU", value: "+678" },
  {
    label: "Venezuela, Bolivarian Republic of Venezuela",
    flag: "🇻🇪",
    code: "VE",
    value: "+58",
  },
  { label: "Vietnam", flag: "🇻🇳", code: "VN", value: "+84" },
  {
    label: "Virgin Islands, British",
    flag: "🇻🇬",
    code: "VG",
    value: "+1284",
  },
  { label: "Virgin Islands, U.S.", flag: "🇻🇮", code: "VI", value: "+1340" },
  { label: "Wallis and Futuna", flag: "🇼🇫", code: "WF", value: "+681" },
  { label: "Yemen", flag: "🇾🇪", code: "YE", value: "+967" },
  { label: "Zambia", flag: "🇿🇲", code: "ZM", value: "+260" },
  { label: "Zimbabwe", flag: "🇿🇼", code: "ZW", value: "+263" },
];

export const holding_time = [
  {
    label: "5 years",
    value: "5 years",
  },
  {
    label: "5-10 years",
    value: "5-10 years",
  },
  {
    label: "10-20 years",
    value: "10-20 years",
  },
  {
    label: "20+ years",
    value: "20+ years",
  },
  // {
  //   label: "Other",
  //   value: "Other",
  // },
];

export const office_region = [
  {
    label: "UK",
    value: "UK",
  },
  {
    label: "US",
    value: "US",
  },
  {
    label: "EU",
    value: "EU",
  },
];

export const agreement = [
  {
    title: "Price Risk",
    icon: TrendingDown,
    description:
      "Wine prices can go up and down. The value of your collection may fluctuate, and returns are not guaranteed. You will, however, always retain ownership of your wines.",
    details:
      "I understand that wine prices may fluctuate and that while the value may fall, I will continue to own my collection.",
  },
  {
    title: "Liquidity Risk",
    icon: Clock,
    description:
      "Fine wine may take time to sell, so you might not be able to access your collection’s value immediately.",
    details: "I understand that my wine collection is not instantly liquid.",
  },
  {
    title: "Collection Warning",
    icon: CircleAlert,
    description:
      "The value of your wine collection can go up or down. Past performance is no indication of future performance. Seek advice if you are unsure whether wine is suitable for you.",
    details:
      "I understand that past performance is no indication of future performance.",
  },
];

export const agreement_list_2 = [
  // Introduction
  {
    content: [
      {
        title: "Introduction",
        description:
          "Welcome to <b>Vintage Associates Fine Wine Merchants</b> (“Vintage Associates”, “we”, “us”, “our”). <br/>We operate an exclusive membership-based platform allowing approved clients to purchase, store, manage, and resell fine wine through our App and website, alongside a concierge service, exclusive member-only sporting and wine events, market insights, and premium support services. <br/><br/>These Terms & Conditions (“Terms”) govern your use of our Site, App, membership programme, marketplace, and all related services. <br/><br/>By applying for membership, using our App, or purchasing wine through our platform, you agree to these Terms.",
        bullets: [],
        sub_data: [],
        footer: "",
      },
      // Eligibility & Age Requirements
      {
        title: "Eligibility & Age Requirements",
        description: "",
        bullets: [
          {
            title: "You must be 18 years or older to hold a main account.",
            bullets: [],
          },
          {
            title:
              "You may purchase wine on behalf of a minor by creating a sub-account for gifting purposes; ownership transfers only when the individual turns 18.",
            bullets: [],
          },
        ],
        sub_data: [],
        footer: "",
      },
      // Membership Application & Acceptance
      {
        title: "Membership Application & Acceptance",
        description: "",
        bullets: [
          {
            title:
              "All prospective clients must complete our Membership Application Form.",
            bullets: [],
          },
          {
            title:
              "Applications are reviewed by our internal committee and may be accepted or declined at our discretion.",
            bullets: [],
          },
          {
            title:
              "Upon approval, we will create your account and provide login details.",
            bullets: [],
          },
          {
            title: "Membership is exclusively for approved individuals only.",
            bullets: [],
          },
        ],
        sub_data: [],
        footer: "",
      },
      // Membership Fees & Billing
      {
        title: "Membership Fees & Billing",
        description: "",
        bullets: [],
        sub_data: [
          {
            subtitle: "Annual Management Fee",
            subdescription:
              "Members pay an annual <b>3% management fee</b>, calculated on the <b>total market value</b> of their collection. <br/><br/> This fee includes:",
            subbullets: [
              {
                title: "secure wine storage",
                bullets: "",
              },
              {
                title: "full-value insurance",
                bullets: "",
              },
              {
                title: "access to our App and marketplace",
                bullets: "",
              },
              {
                title: "portfolio monitoring",
                bullets: "",
              },
              {
                title: "concierge service",
                bullets: "",
              },
              {
                title: "invitations to exclusive sporting and wine events",
                bullets: "",
              },
              {
                title: "market updates, reports, and insights",
                bullets: "",
              },
              {
                title: "administrative and account services",
                bullets: "",
              },
            ],
          },
          {
            subtitle: "Monthly Charges",
            subdescription:
              "The annual 3% fee is charged <b>monthly</b>, using the current market value of the client’s portfolio. <br/><br/>You can view your next scheduled monthly payment at any time inside the App under Settings. This is the amount that will be debited for that month.",
            subbullets: [],
          },
          {
            subtitle: "Missed Payments",
            subdescription: "",
            subbullets: [
              {
                title:
                  "If you miss <b>one monthly payment</b>, you will be <b>locked out of your account</b> until the payment is settled. Once paid, full access is restored immediately.",
                bullets: "",
              },
              {
                title:
                  "If you miss <b>two consecutive payments</b>, we reserve the legal right to <b>sell wine from your account</b> to recover any overdue fees.",
                bullets: "",
              },
              {
                title:
                  "If you sell wine while fees are outstanding, we will <b>deduct any unpaid fees from the sale proceeds</b>, and remit the remaining balance to you.",
                bullets: "",
              },
            ],
          },
          {
            subtitle: "Payments",
            subdescription:
              "All membership fees must be paid via Direct Debit. All fees are non-refundable.",
            subbullets: [],
          },
        ],
        footer: "",
      },

      // Purchasing Fine Wine
      {
        title: "Purchasing Fine Wine",
        description: "",
        bullets: [
          {
            title:
              "Wines offered through our platform are sourced from elite, reputable suppliers and represent some of the finest wines globally.",
            bullets: [],
          },
          {
            title: "All purchases are <b>final; no refunds</b> are provided.",
            bullets: [],
          },
          {
            title:
              "Wine is priced according to our own market valuation, which may differ from other merchants.",
            bullets: [
              "Market valuations vary industry-wide.",
              "Our valuation represents what we believe to be the most accurate and fair price within the fine wine market at any given time.",
            ],
          },
        ],
        sub_data: [],
        footer: "",
      },
      // Storage & Insurance
      {
        title: "Storage & Insurance",
        description: "",
        bullets: [],
        sub_data: [
          {
            subtitle: "Storage Structure",
            subdescription: "",
            subbullets: [
              {
                title:
                  "Vintage Associates holds a <b>main master account</b> with our professional storage provider.",
                bullets: "",
              },
              {
                title:
                  "Clients receive <b>sub-accounts</b> within our master account for the specific purpose of storing their individual collections.",
                bullets: "",
              },
              {
                title: "Ownership rights remain solely with the client.",
                bullets: "",
              },
            ],
          },
          {
            subtitle: "Insurance",
            subdescription: "",
            subbullets: [
              {
                title:
                  "All wine stored through us is insured at its <b>full current market value</b>.",
                bullets: "",
              },
              {
                title:
                  "A <b>copy of the insurance policy</b> is available to clients <b>upon request at any time</b>.",
                bullets: "",
              },
            ],
          },
          {
            subtitle: "Coverage",
            subdescription:
              "Insurance covers your wine while stored in our approved bonded storage facilities.",
            subbullets: [],
          },
        ],
        footer: "",
      },
      // Delivery
      {
        title: "Delivery",
        description: "",
        bullets: [
          {
            title: "Worldwide delivery is available at the client’s cost.",
            bullets: [],
          },
          {
            title: "Delivery fees are displayed and paid at checkout.",
            bullets: [],
          },
          {
            title:
              "Once wine is <b>transferred to the courier</b>, responsibility and liability pass entirely to the courier.",
            bullets: [],
          },
          {
            title:
              "We use top-tier couriers suitable for transporting high-value wine.",
            bullets: [],
          },
        ],
        sub_data: [],
        footer: "",
      },
      // Selling Wine Through Our Marketplace
      {
        title: "Selling Wine Through Our Marketplace",
        description: "",
        bullets: [
          {
            title:
              "Clients may list their wine for sale on our internal marketplace.",
            bullets: [],
          },
          {
            title:
              "We guarantee that clients will <b>always receive an offer</b>, but we <b>cannot guarantee a timeframe</b> for sale or the final sale price.",
            bullets: [],
          },
          {
            title:
              "Sale offers may differ from our internal market values due to real-time market conditions.",
            bullets: [],
          },
          {
            title:
              "If a client owes fees at the time of sale, these will be <b>deducted automatically</b> from the proceeds before the balance is paid out.",
            bullets: [],
          },
        ],
        sub_data: [],
        footer: "",
      },
      // Market Valuation
      {
        title: "Market Valuation",
        description: "",
        bullets: [
          {
            title:
              "All valuations shown in your portfolio are <b>Vintage Associates’ internal market valuations</b>.",
            bullets: [],
          },
          {
            title:
              "These valuations <b>do not represent a guaranteed sale or buyout price</b>.",
            bullets: [],
          },
          {
            title:
              "Wine markets vary significantly between merchants; price differences are normal.",
            bullets: [],
          },
          {
            title:
              "We believe our valuation is the <b>most accurate and fair representation</b> based on available data, but values may fluctuate.",
            bullets: [],
          },
        ],
        sub_data: [],
        footer: "",
      },
      // Market Reports, News & Insights
      {
        title: "Market Reports, News & Insights",
        description: "",
        bullets: [
          {
            title:
              "Members receive access to market reports, news updates, and insights through our App.",
            bullets: [],
          },
          {
            title: "These updates are compiled from a combination of:",
            bullets: [
              {
                title: "third-party industry sources",
                bullets: [],
              },
              {
                title: "market data providers",
                bullets: [],
              },
              {
                title: "our own research",
                bullets: [],
              },
            ],
          },
          {
            title:
              "Information is provided in good faith and to the best of our knowledge, but we <b>cannot guarantee completeness, accuracy, or authenticity</b> due to the nature of third-party data.",
            bullets: [],
          },
        ],
        sub_data: [],
        footer: "",
      },
      // Risk Warnings
      {
        title: "Risk Warnings",
        description: "",
        bullets: [
          {
            title: "Our App includes a dedicated <b>Risk Warnings</b> section.",
            bullets: [],
          },
          {
            title:
              "We strongly recommend all clients read this information <b>before depositing funds or purchasing wine</b>.",
            bullets: [],
          },
          {
            title:
              "Wine markets can fluctuate, and past performance does not guarantee future results.",
            bullets: [],
          },
        ],
        sub_data: [],
        footer: "",
      },
      // No Financial Advice
      {
        title: "No Financial Advice",
        description:
          "Vintage Associates is <b>not</b> a financial advisor or investment firm.",
        bullets: [
          {
            title: "We do not provide financial, legal, or tax advice.",
            bullets: [],
          },
          {
            title:
              "Any wine recommendations are based on historical market trends, availability, and expert opinion, but <b>do not guarantee future value</b>.",
            bullets: [],
          },
          {
            title:
              "Clients must seek independent professional advice regarding investment decisions.",
            bullets: [],
          },
        ],
        sub_data: [],
        footer: "",
      },
      // Tax Considerations
      {
        title: "Tax Considerations",
        description: "",
        bullets: [
          {
            title:
              "Fine wine is <b>typically considered exempt from Capital Gains Tax (CGT)</b> in the UK, but this depends on several factors, including personal tax status and HMRC classifications.",
            bullets: [],
          },
          {
            title: "Tax laws can change, and personal tax situations vary.",
            bullets: [],
          },
          {
            title:
              "It is the client’s responsibility to consult a qualified tax professional for accurate guidance.",
            bullets: [],
          },
        ],
        sub_data: [],
        footer: "",
      },
      // Affiliate Programme
      {
        title: "Affiliate Programme",
        description:
          "Vintage Associates may work with affiliate partners who refer clients to our platform.",
        bullets: [
          {
            title:
              "If a client joins via an affiliate, <b>Vintage Associates accepts no responsibility</b> for any promises, claims, or representations made by that affiliate or partner.",
            bullets: [],
          },
          {
            title:
              "Only information provided directly by Vintage Associates should be relied upon.",
            bullets: [],
          },
        ],
        sub_data: [],
        footer: "",
      },
      // User Responsibilities
      {
        title: "User Responsibilities",
        description: "Clients agree to:",
        bullets: [
          {
            title: "provide accurate information",
            bullets: [],
          },
          {
            title: "secure their login details",
            bullets: [],
          },
          {
            title: "maintain an active Direct Debit",
            bullets: [],
          },
          {
            title: "use the App lawfully",
            bullets: [],
          },
          {
            title: "monitor their own tax obligations",
            bullets: [],
          },
        ],
        sub_data: [],
        footer:
          "Clients are responsible for all activity under their main account and any sub-accounts.",
      },
      // Limitation of Liability
      {
        title: "Limitation of Liability",
        description: "",
        bullets: [
          {
            title:
              "We are not liable for market fluctuations, client losses, or changes in valuation.",
            bullets: [],
          },
          {
            title:
              "We hold no liability once wine has been transferred to a courier.",
            bullets: [],
          },
          {
            title:
              "We are not responsible for indirect, consequential, or profit-related losses.",
            bullets: [],
          },
          {
            title:
              "Our responsibility is limited strictly to the storage, insurance, and administrative services we provide.",
            bullets: [],
          },
        ],
        sub_data: [],
        footer: "",
      },
      // Account Suspension or Termination
      {
        title: "Account Suspension or Termination",
        description: "We may suspend or terminate accounts for:",
        bullets: [
          {
            title: "non-payment of fees",
            bullets: [],
          },
          {
            title: "misuse of the App",
            bullets: [],
          },
          {
            title: "breach of these Terms",
            bullets: [],
          },
          {
            title: "inappropriate or unlawful activity",
            bullets: [],
          },
        ],
        sub_data: [],
        footer:
          "Outstanding fees will be collected from the client’s wine holdings or deducted from sale proceeds.",
      },
      // Intellectual Property
      {
        title: "Intellectual Property",
        description:
          "All logos, branding, images, text, and digital assets on the App or Site belong to Vintage Associates or our licensors and may not be used without permission.",
        bullets: [],
        sub_data: [],
        footer: "",
      },
      // Communications
      {
        title: "Communications",
        description: "Members agree to receive:",
        bullets: [
          {
            title: "essential account updates",
            bullets: [],
          },
          {
            title: "required notices",
            bullets: [],
          },
          {
            title: "market updates, offers, and reports",
            bullets: [],
          },
        ],
        sub_data: [],
        footer: "Marketing communications may be opted out of at any time.",
      },
      // Governing Law
      {
        title: "Governing Law",
        description:
          "These Terms are governed by the <b>laws of England and Wales</b>. <br/>Clients are encouraged to contact us in the event of any concerns; however, we do not require formal dispute resolution processes.",
        bullets: [],
        sub_data: [],
        footer: "",
      },
      {
        title: "Amendments",
        description:
          "We may update these Terms periodically. Continued use of our services constitutes acceptance of any revised Terms.",
        bullets: [],
        sub_data: [],
        footer: "",
      },
    ],
    footer: [
      {
        title: "Contact",
        content: [
          {
            title: "<b>Support:</b>",
            description: "support@vintage-associates.co.uk",
          },
          {
            title: "<b>General Enquiries:</b>",
            description: "admin@vintage-associates.co.uk",
          },
          {
            title: "<b>Telephone:</b>",
            description: "0203 998 3486",
          },
          {
            title: "<b>Address:</b>",
            description: "Sopers House, Sopers Road, Cuffley, EN6 4NY, England",
          },
        ],
      },
    ],
  },
];

export const menu_list = [
  {
    label: "Dashboard",
    value: "dashboard",
    icon: LayoutDashboard,
    link: "/vintage/dashboard",
  },
  {
    label: "Concierge",
    value: "concierge",
    icon: ConciergeBell,
    link: "/vintage/concierge",
  },
  {
    label: "Marketplace",
    value: "marketplace",
    icon: Store,
    link: "/vintage/marketplace",
  },
  {
    label: "My Portfolio",
    value: "portfolio",
    icon: Briefcase,
    link: "/vintage/portfolio",
  },
  {
    label: "My Wine Cellar",
    value: "cellar",
    icon: mywinecellar,
    link: "/vintage/cellar",
  },
];

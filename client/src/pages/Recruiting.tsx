import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users, Search, MapPin, Briefcase, ExternalLink, Building2, Filter,
  Star, ChevronDown, ChevronUp, Trophy, TrendingUp, Clock, Truck,
  ArrowLeftRight, Globe
} from "lucide-react";

interface Candidate {
  name: string;
  title: string;
  company: string;
  location: string;
  linkedin: string;
  experience: string;
  yearsExperience: number;
  specialties: string[];
}

// All candidate data embedded directly — 92 total
const recruitingData: {
  rk: Candidate[];
  ott_ltl: Candidate[];
  freight_brokerage: Candidate[];
  freight_forwarding: Candidate[];
} = {
  rk: [
    { name: "Michael Snedeker", title: "VP of Business Development, Auto-Mobility & Industrial", company: "GXO Logistics", location: "Capistrano Beach, CA", linkedin: "https://www.linkedin.com/in/michael-snedeker-mba-37924b29", experience: "VP of Business Development at GXO Logistics since 2023, covering Auto-Mobility & Industrial verticals. Previously Director of BD at UPS Supply Chain Solutions for 6 years.", yearsExperience: 25, specialties: ["3PL/contract logistics", "automotive", "business development"] },
    { name: "Mei Li C", title: "Director, Account Management", company: "GXO Logistics", location: "Los Angeles Metro, CA", linkedin: "https://www.linkedin.com/in/meilizhoudeng", experience: "Director of Account Management at GXO Logistics since April 2025. Focused on managing and growing key logistics accounts.", yearsExperience: 8, specialties: ["account management", "3PL/contract logistics", "supply chain"] },
    { name: "David Varela", title: "Manager, Account Management", company: "GXO Logistics", location: "San Francisco Bay Area, CA", linkedin: "https://www.linkedin.com/in/fdvarela", experience: "Account Management Manager at GXO Logistics in the Bay Area, overseeing key accounts.", yearsExperience: 5, specialties: ["account management", "3PL/contract logistics", "e-commerce"] },
    { name: "Richard Choi", title: "Director of Business Development", company: "XPO Logistics", location: "Los Angeles, CA", linkedin: "https://www.linkedin.com/in/richard-choi-a595941b", experience: "Director of BD at XPO in LA, specializing in global and domestic transportation solutions across all modes.", yearsExperience: 18, specialties: ["business development", "supply chain", "3PL/contract logistics"] },
    { name: "Sean Patrick Caudill", title: "Regional Director of Sales, California", company: "XPO Logistics", location: "Los Angeles Metro, CA", linkedin: "https://www.linkedin.com/in/spcaudill", experience: "Regional Director of Sales for California at XPO since May 2024. 9+ years at XPO across account executive and national account roles.", yearsExperience: 12, specialties: ["territory sales", "business development", "supply chain"] },
    { name: "Mario Daniel", title: "Sales Manager", company: "XPO Logistics", location: "Los Angeles, CA", linkedin: "https://www.linkedin.com/in/mario-daniel-a80abb200", experience: "Sales Manager at XPO in LA since 2017, driving sustained regional sales growth.", yearsExperience: 9, specialties: ["sales management", "account management", "supply chain"] },
    { name: "Tim Sweeney", title: "VP Business Development", company: "Ryder Supply Chain Solutions", location: "Larkspur, CA", linkedin: "https://www.linkedin.com/in/tim-sweeney-9202987", experience: "Long-tenured VP of BD at Ryder in Northern California. Deep 3PL, contract logistics, and fleet management expertise.", yearsExperience: 35, specialties: ["3PL/contract logistics", "business development", "supply chain"] },
    { name: "James Tao", title: "VP Business Development", company: "Ryder Supply Chain Solutions", location: "Fremont, CA", linkedin: "https://www.linkedin.com/in/james-tao-9159218", experience: "VP of BD at Ryder in Fremont — directly in RK Logistics' home market.", yearsExperience: 15, specialties: ["3PL/contract logistics", "business development", "supply chain"] },
    { name: "Anne Namikawa", title: "Director of Business Development", company: "Ryder Supply Chain Solutions", location: "Rialto, CA", linkedin: "https://www.linkedin.com/in/anne-namikawa-2b195614", experience: "Director of BD at Ryder in the Inland Empire, specializing in transportation and supply chain.", yearsExperience: 15, specialties: ["3PL/contract logistics", "business development", "Inland Empire market"] },
    { name: "Brian Kerr", title: "VP of Sales, West Region", company: "Ryder System", location: "Carlsbad, CA", linkedin: "https://www.linkedin.com/in/brian-kerr-a9a08a16", experience: "VP of Sales for the West Region at Ryder, covering fleet management across the western US.", yearsExperience: 20, specialties: ["3PL/contract logistics", "fleet management", "West Coast sales"] },
    { name: "Bryan Curtin", title: "Director of Sales", company: "Ryder System", location: "West Sacramento, CA", linkedin: "https://www.linkedin.com/in/bryan-curtin-a2aa3351", experience: "Director of Sales at Ryder in NorCal/Nevada since Dec 2025. 6+ years as BD Manager growing Sacramento territory.", yearsExperience: 10, specialties: ["3PL/contract logistics", "territory sales", "Northern California"] },
    { name: "Michael Senella", title: "Business Development Manager", company: "Ryder System", location: "Northridge, CA", linkedin: "https://www.linkedin.com/in/michael-senella-2b121684", experience: "BD Manager at Ryder in San Fernando Valley since 2015, 15+ years in progressive sales roles.", yearsExperience: 15, specialties: ["3PL/contract logistics", "business development", "Los Angeles market"] },
    { name: "Shawn Davis", title: "Enterprise Sales & Strategic Partnerships", company: "Ryder System", location: "Los Angeles, CA", linkedin: "https://www.linkedin.com/in/shawn-davis-ctp-67303b41", experience: "CTP leading enterprise sales and partnerships at Ryder in LA. 15+ years in transportation.", yearsExperience: 16, specialties: ["enterprise sales", "supply chain", "strategic partnerships"] },
    { name: "Alexandre Pezant", title: "Sales Director, Air & Ocean — US West Coast", company: "CEVA Logistics", location: "Torrance, CA", linkedin: "https://www.linkedin.com/in/alexandre-pezant-cltd-67bb0a24", experience: "Sales Director for the US West Coast at CEVA in Torrance. Freight forwarding and international logistics.", yearsExperience: 14, specialties: ["supply chain", "business development", "West Coast sales"] },
    { name: "Christina Herloev Nielsen", title: "Business Development Manager", company: "CEVA Logistics", location: "Los Angeles Metro, CA", linkedin: "https://www.linkedin.com/in/christina-herloev-nielsen-75b84a34", experience: "BD Manager at CEVA since Jan 2023. Previously at GEFCO for 3.5 years.", yearsExperience: 9, specialties: ["business development", "supply chain", "account management"] },
    { name: "Tim Albrent", title: "Business Development Manager", company: "CEVA Logistics", location: "Ventura, CA", linkedin: "https://www.linkedin.com/in/tim-albrent-038a5551", experience: "BD Manager at CEVA since March 2024. Automotive logistics, FTL, freight forwarding background.", yearsExperience: 10, specialties: ["business development", "automotive", "freight forwarding"] },
    { name: "David Caceres", title: "Business Development Executive", company: "CEVA Logistics", location: "Los Angeles Metro, CA", linkedin: "https://www.linkedin.com/in/davidcacerescevalogistics", experience: "BDE at CEVA in LA, specializing in B2C e-commerce air freight and key account development.", yearsExperience: 12, specialties: ["business development", "e-commerce", "account management"] },
    { name: "Erika Heguy", title: "Business Development Executive", company: "CEVA Logistics", location: "Lakeside (San Diego), CA", linkedin: "https://www.linkedin.com/in/erika-heguy-43960226", experience: "BDE at CEVA in San Diego area, identifying opportunities and implementing supply chain solutions.", yearsExperience: 10, specialties: ["business development", "supply chain", "3PL/contract logistics"] },
    { name: "Todd Sweeney", title: "Regional Sales Manager", company: "CEVA Logistics", location: "Cypress, CA", linkedin: "https://www.linkedin.com/in/todd-sweeney-8090332a", experience: "Regional Sales Manager at CEVA in Orange County, managing regional revenue and key accounts.", yearsExperience: 12, specialties: ["regional sales", "account management", "supply chain"] },
    { name: "Margo Waldie", title: "VP of Business Development", company: "NFI Industries", location: "Redondo Beach, CA", linkedin: "https://www.linkedin.com/in/margosales101", experience: "VP of BD at NFI covering warehousing, drayage, fulfillment, and transportation.", yearsExperience: 20, specialties: ["3PL/contract logistics", "warehousing", "drayage/intermodal"] },
    { name: "David Brown", title: "VP of Sales — Transportation Logistics", company: "NFI Industries", location: "San Francisco Bay Area, CA", linkedin: "https://www.linkedin.com/in/davebrownnfiindustries", experience: "VP of Sales at NFI in NorCal, responsible for OTR, brokerage, and intermodal lines.", yearsExperience: 18, specialties: ["3PL/contract logistics", "supply chain", "business development"] },
    { name: "Craig Sloss", title: "Sales Manager", company: "Radiant Logistics", location: "Huntington Beach, CA", linkedin: "https://www.linkedin.com/in/craigsloss", experience: "Sales Manager at Radiant in SoCal, specializing in high-security transportation and warehousing.", yearsExperience: 16, specialties: ["warehousing", "supply chain", "account management"] },
    { name: "Maricel Duque", title: "Director, Supply Chain BD", company: "DHL Supply Chain", location: "San Francisco, CA", linkedin: "https://www.linkedin.com/in/maricel-duque-542446199", experience: "Director of BD at DHL Supply Chain in SF, managing contract logistics solutions.", yearsExperience: 14, specialties: ["3PL/contract logistics", "warehousing", "business development"] },
    { name: "Martin Bringas", title: "AVP — Sales", company: "Hub Group", location: "San Diego County, CA", linkedin: "https://www.linkedin.com/in/martinbringas", experience: "AVP of Sales at Hub Group in San Diego since 2018. 19+ years at Hub Group.", yearsExperience: 20, specialties: ["3PL/contract logistics", "business development", "cross-border logistics"] },
    { name: "Joel Bluen", title: "Sr. Account Manager, LTL Brokerage", company: "Hub Group", location: "Los Angeles, CA", linkedin: "https://www.linkedin.com/in/joel-bluen-7614224a", experience: "Sr. Account Manager for LTL Brokerage at Hub Group in LA since 2012.", yearsExperience: 14, specialties: ["LTL", "freight brokerage", "account management"] },
    { name: "Jesse Salazar", title: "Account Manager", company: "Hub Group", location: "Mesa, AZ", linkedin: "https://www.linkedin.com/in/jesse-salazar-b9b988b1", experience: "Account Manager at Hub Group in Mesa since 2017. FTL, LTL, intermodal background.", yearsExperience: 15, specialties: ["account management", "freight brokerage", "LTL"] },
    { name: "Tamara Sams", title: "Regional Manager", company: "Hub Group", location: "Fontana, CA", linkedin: "https://www.linkedin.com/in/tamara-sams-4b8ba352", experience: "Regional Manager at Hub Group in Inland Empire since 2021. 17 years as GM at MXD Group.", yearsExperience: 20, specialties: ["3PL/contract logistics", "warehousing", "Inland Empire market"] },
  ],
  ott_ltl: [
    { name: "Ron Erdei", title: "Regional Director of Sales and Marketing", company: "Saia LTL Freight", location: "Brick, New Jersey", linkedin: "https://www.linkedin.com/in/ron-erdei-7a4b0323", experience: "Currently serves as Regional Director of Sales and Marketing at Saia LTL Freight, based in the NJ/NY metro corridor. Brings 35+ years of freight transportation sales leadership.", yearsExperience: 35, specialties: ["LTL", "Regional Sales Leadership", "Northeast Market", "Account Management"] },
    { name: "Ken Waters", title: "Sales Representative", company: "Old Dominion Freight Line", location: "Mineola, New York", linkedin: "https://www.linkedin.com/in/ken-waters-aa88a326", experience: "Sales Representative at Old Dominion Freight Line based in Mineola, Long Island — directly in OTT's core market. 30+ years of LTL freight sales experience in the NY Metro area.", yearsExperience: 31, specialties: ["LTL", "Long Island", "Northeast Market", "Account Management"] },
    { name: "Vinny Cafiso", title: "Northeast Solutions Specialist", company: "Estes Express Lines", location: "East Meadow, New York", linkedin: "https://www.linkedin.com/in/vinny-cafiso-0b4a2923", experience: "Northeast Solutions Specialist at Estes Express Lines, based in East Meadow on Long Island — minutes from OTT's Farmingdale HQ. 26+ years of LTL freight sales expertise, Presidents Club-level producer.", yearsExperience: 26, specialties: ["LTL", "Long Island", "Northeast Market", "Account Management"] },
    { name: "Daniel Alt", title: "Sales Executive", company: "FedEx Freight", location: "Rochester, New York", linkedin: "https://www.linkedin.com/in/danielalt1", experience: "Sales Executive at FedEx Freight with 26+ years of LTL freight industry experience. Exceptional record of revenue growth and business development across major LTL carriers in the Northeast.", yearsExperience: 26, specialties: ["LTL", "Business Development", "Account Management"] },
    { name: "Bill Dixon", title: "Account Manager", company: "Old Dominion Freight Line", location: "Wenonah, New Jersey", linkedin: "https://www.linkedin.com/in/bill-dixon-02b71b24", experience: "Account Manager at Old Dominion Freight Line with 22+ years of LTL freight sales experience in the NJ/PA/NY market.", yearsExperience: 22, specialties: ["LTL", "Account Management", "Northeast Market"] },
    { name: "Jeffrey Valfer", title: "Corporate Account Manager", company: "FedEx Freight", location: "Lindenhurst, New York", linkedin: "https://www.linkedin.com/in/jeff-valfer-9b6a7427", experience: "Corporate Account Manager at FedEx Freight based in Lindenhurst, Long Island — in OTT's home market. 21+ years of LTL freight sales experience.", yearsExperience: 21, specialties: ["LTL", "Long Island", "Corporate Accounts", "Account Management"] },
    { name: "John Sypa", title: "NY/NJ Regional Account Executive", company: "Vision Express / Wragtime Transportation", location: "Edison, New Jersey", linkedin: "https://www.linkedin.com/in/john-sypa-69a0b319", experience: "NY/NJ Regional Account Executive with 18+ years of freight sales experience. Previously with XPO Logistics.", yearsExperience: 18, specialties: ["LTL", "Northeast Market", "Account Management", "New York"] },
    { name: "Lonny Lacount", title: "Solutions Sales Specialist", company: "Old Dominion Freight Line", location: "Rouses Point, New York", linkedin: "https://www.linkedin.com/in/lonny-lacount-b8b59919", experience: "Solutions Sales Specialist at Old Dominion and multiple Presidents Club winner. 18+ years of LTL freight sales experience.", yearsExperience: 18, specialties: ["LTL", "Account Management", "Presidents Club"] },
    { name: "Bob Marsdale", title: "Senior Account Executive / Business Development", company: "Saia LTL Freight", location: "Medford, New Jersey", linkedin: "https://www.linkedin.com/in/bob-marsdale-6b0a5422", experience: "Senior Account Executive and BD professional at Saia LTL Freight. 16+ years of LTL freight sales in the NY/NJ corridor.", yearsExperience: 16, specialties: ["LTL", "Business Development", "Account Management", "Northeast Market"] },
    { name: "Geordan Grieco", title: "Worldwide Account Manager", company: "XPO Logistics", location: "Hoboken, New Jersey", linkedin: "https://www.linkedin.com/in/geordan-grieco-7b3a1120", experience: "Worldwide Account Manager at XPO Logistics in Hoboken, NJ. 16+ years of LTL freight sales expertise.", yearsExperience: 16, specialties: ["LTL", "Account Management", "Northeast Market", "New York"] },
    { name: "Tony Pangallo", title: "Director of Sales", company: "Old Dominion Freight Line", location: "Bethpage, New York", linkedin: "https://www.linkedin.com/in/tony-pangallo-0a4a4119", experience: "Director of Sales at Old Dominion based in Bethpage, Long Island — highly local to OTT's territory. 15+ years of LTL sales leadership.", yearsExperience: 15, specialties: ["LTL", "Long Island", "Sales Leadership", "Northeast Market"] },
    { name: "Gary Dragona", title: "Business Development Manager", company: "XPO Logistics", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/gary-dragona-1a3a5319", experience: "BD Manager at XPO covering NYC metro region. 15+ years of LTL freight and logistics sales experience.", yearsExperience: 15, specialties: ["LTL", "Business Development", "Northeast Market", "New York"] },
    { name: "Amelia Govan", title: "Sales Account Executive", company: "TForce Freight", location: "New York, New York", linkedin: "https://www.linkedin.com/in/amelia-govan-089a472b", experience: "Sales Account Executive at TForce Freight in NYC with proven track record of driving revenue growth. Leverages AI and analytics to improve forecasting.", yearsExperience: 15, specialties: ["LTL", "Account Management", "Business Development", "Northeast Market"] },
    { name: "Jeff Didomenico", title: "Senior Account Executive", company: "Saia LTL Freight", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/jeff-didomenico-7528569", experience: "Senior AE at Saia in NYC Metro with prior experience at Daylight Transport (13+ years). 14+ years of LTL freight sales.", yearsExperience: 14, specialties: ["LTL", "Account Management", "Northeast Market", "New York"] },
    { name: "Mark Piro", title: "Solutions Sales Specialist", company: "Old Dominion Freight Line", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/mark-piro-5a1a4b17", experience: "Solutions Sales Specialist at Old Dominion covering NYC metro. 14+ years of LTL freight sales.", yearsExperience: 14, specialties: ["LTL", "Account Management", "Northeast Market", "New York"] },
    { name: "Jenna Cornell", title: "Account Executive", company: "Saia LTL Freight", location: "Rensselaer, New York", linkedin: "https://www.linkedin.com/in/jcornell4", experience: "Drives sales growth for Saia in the Capital Region of NY. Worked with national brands including Walt Disney Company, OSRAM Sylvania.", yearsExperience: 14, specialties: ["LTL", "Account Management", "Business Development"] },
    { name: "Vincent Elia", title: "Account Executive", company: "Saia LTL Freight", location: "Beachwood, New Jersey", linkedin: "https://www.linkedin.com/in/vincent-elia-b2b97346", experience: "AE at Saia LTL Freight. 12+ years of LTL freight sales in the NJ/NY market.", yearsExperience: 12, specialties: ["LTL", "Account Management", "Northeast Market"] },
    { name: "Jonathan Pitman", title: "Director of Sales", company: "TForce Freight", location: "Dumont, New Jersey", linkedin: "https://www.linkedin.com/in/jonathan-pitman-1b3a4519", experience: "Director of Sales at TForce Freight leading sales operations across NYC metro and Northern NJ. 11+ years of LTL freight sales leadership.", yearsExperience: 11, specialties: ["LTL", "Sales Leadership", "Northeast Market", "Business Development"] },
    { name: "Anthony Sabatino", title: "Solutions Specialist", company: "Old Dominion Freight Line", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/anthony-sabatino-0b4a4319", experience: "Solutions Specialist at Old Dominion covering NYC metro. 11+ years of LTL freight sales expertise.", yearsExperience: 11, specialties: ["LTL", "Account Management", "Northeast Market", "New York"] },
    { name: "Bernadette Garcia Parmer", title: "Sales Manager", company: "Old Dominion Freight Line", location: "Nanuet, New York", linkedin: "https://www.linkedin.com/in/bernadette-garcia-parmer-2b4a5019", experience: "Sales Manager at Old Dominion in Nanuet, NY (Rockland County). 10+ years of LTL freight sales management.", yearsExperience: 10, specialties: ["LTL", "Sales Management", "Northeast Market", "New York"] },
    { name: "Nicole Saccomanno", title: "Sales Executive", company: "XPO Logistics", location: "Mahwah, New Jersey", linkedin: "https://www.linkedin.com/in/nicole-saccomanno-0b2a5419", experience: "Sales Executive at XPO Logistics in Mahwah, NJ. 10+ years of LTL freight sales.", yearsExperience: 10, specialties: ["LTL", "Account Management", "Northeast Market", "Business Development"] },
    { name: "Lisa Miller", title: "Corporate Business Development Manager", company: "Saia LTL Freight", location: "Islip Terrace, New York", linkedin: "https://www.linkedin.com/in/lisa-miller-47a7b216", experience: "Corporate BD Manager at Saia based in Islip Terrace, Long Island — in OTT's immediate home market. Previously held corporate BD roles at TForce/UPS Freight.", yearsExperience: 9, specialties: ["LTL", "Long Island", "Business Development", "Corporate Accounts"] },
    { name: "Austin Marotto", title: "Outside Sales Representative", company: "Old Dominion Freight Line", location: "Centereach, New York", linkedin: "https://www.linkedin.com/in/austin-marotto-0b4a5819", experience: "Outside Sales Rep at Old Dominion in Centereach, Suffolk County — deep in OTT's Long Island territory. 9+ years of LTL freight sales.", yearsExperience: 9, specialties: ["LTL", "Long Island", "Account Management", "Business Development"] },
    { name: "Michael Vajda", title: "Business Development Specialist", company: "XPO Logistics", location: "Waldwick, New Jersey", linkedin: "https://www.linkedin.com/in/michael-vajda-0b2a5119", experience: "BD Specialist at XPO Logistics in Waldwick, NJ. 9+ years of LTL freight sales experience.", yearsExperience: 9, specialties: ["LTL", "Business Development", "Northeast Market", "Account Management"] },
    { name: "Akeem Mcfarlane", title: "Sales Manager", company: "FedEx Freight", location: "Brooklyn, New York", linkedin: "https://www.linkedin.com/in/akeem-mcfarlane-0b3a4719", experience: "Sales Manager at FedEx Freight in Brooklyn. 8+ years of LTL freight sales and leadership in the NYC metro region.", yearsExperience: 8, specialties: ["LTL", "Sales Management", "Business Development", "New York"] },
  ],
  freight_brokerage: [
    { name: "Jose Gonzalez", title: "Transportation Sales Representative", company: "C.H. Robinson", location: "Audubon, New Jersey", linkedin: "https://www.linkedin.com/in/jose-gonzalez-0b1a4719", experience: "Transportation Sales Rep at C.H. Robinson. 26+ years of freight brokerage sales in the Northeast corridor.", yearsExperience: 26, specialties: ["Freight Brokerage", "Truckload", "LTL", "Shipper Sales", "Northeast Market"] },
    { name: "Jeff Meslow", title: "Agent", company: "Horizon Mid-Atlantic / TRX Great Lakes", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/jeff-meslow-ceo-6261147", experience: "Independent freight agent with 25+ years covering Boston, Newark, Charleston, and Greer markets. Deep expertise in domestic freight brokerage.", yearsExperience: 25, specialties: ["Freight Brokerage", "Carrier Relations", "Shipper Sales", "Northeast Market"] },
    { name: "Jessica Vander Wall", title: "Account Manager", company: "C.H. Robinson", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/jessica-vander-wall-0b1a4619", experience: "Account Manager at C.H. Robinson in NYC metro. 23+ years of logistics and freight brokerage sales.", yearsExperience: 23, specialties: ["Freight Brokerage", "Account Management", "Shipper Sales", "Northeast Market"] },
    { name: "Darlene Trendel", title: "Manager, Business Development", company: "Shunra Logistics", location: "Manorville, New York", linkedin: "https://www.linkedin.com/in/darlene-trendel-0b3a5219", experience: "BD Manager in Manorville, Long Island. 18+ years of freight brokerage and transportation sales in the NY metro area.", yearsExperience: 18, specialties: ["Freight Brokerage", "Business Development", "Long Island", "Northeast Market"] },
    { name: "Jim Quinn", title: "General Manager of Logistics", company: "The Gilbert Company", location: "Keasbey, New Jersey", linkedin: "https://www.linkedin.com/in/jquinnlogistics", experience: "GM of Logistics at The Gilbert Company. 15+ years of freight brokerage and logistics management expertise in the NJ/NY market.", yearsExperience: 15, specialties: ["Freight Brokerage", "Carrier Relations", "Shipper Sales", "Truckload", "Northeast Market"] },
    { name: "Todd R Amann", title: "Director of Business Development, North America", company: "Compass Forwarding", location: "Queens, New York", linkedin: "https://www.linkedin.com/in/todd-r-amann-7932879", experience: "Director of BD for North America at Compass Forwarding in Queens, NY. 12+ years of freight and logistics business development.", yearsExperience: 12, specialties: ["Freight Brokerage", "Business Development", "Northeast Market", "New York"] },
    { name: "Kenneth Lebovits", title: "Business Development Manager", company: "FedEx Freight / XPO", location: "New York, New York", linkedin: "https://www.linkedin.com/in/kenneth-lebovits-0b2a4219", experience: "BD Manager in NYC with 12+ years of freight sales experience. Has held BD roles at FedEx Freight and XPO.", yearsExperience: 12, specialties: ["LTL", "Business Development", "Freight Brokerage", "Northeast Market"] },
    { name: "Christopher Connolly", title: "Client Relationship Manager", company: "C.H. Robinson", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/christopher-connolly-0b2a4519", experience: "Client Relationship Manager at C.H. Robinson in NYC metro. 11+ years of freight brokerage experience.", yearsExperience: 11, specialties: ["Freight Brokerage", "Account Management", "Carrier Relations", "Northeast Market"] },
    { name: "Harvey Parker", title: "Business Development Executive", company: "Nationwide Transport Services", location: "Iselin, New Jersey", linkedin: "https://www.linkedin.com/in/harvey-parker-0b1a5119", experience: "BDE in Iselin, NJ. 11+ years of freight brokerage sales in the NYC/NJ metro market.", yearsExperience: 11, specialties: ["Freight Brokerage", "Business Development", "Truckload", "LTL", "Northeast Market"] },
    { name: "Jeff Leniart", title: "International Sales Manager", company: "DHL eCommerce", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/jeff-leniart-45421b21", experience: "International Sales Manager at DHL eCommerce covering the Northeast. 10+ years of freight and logistics sales.", yearsExperience: 10, specialties: ["DHL", "International Logistics", "Account Management", "Northeast Market"] },
    { name: "Hamza Okuyan", title: "Cargo Sales Representative", company: "Turkish Airlines Cargo", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/hamza-okuyan-0b2a4819", experience: "Cargo Sales Rep in NYC metro focused on air cargo and freight sales. 9+ years of freight sales experience.", yearsExperience: 9, specialties: ["Cargo Sales", "Air Freight", "Shipper Sales", "Northeast Market"] },
    { name: "Mark Nolan", title: "Sales Executive", company: "Logfret", location: "Carteret, New Jersey", linkedin: "https://www.linkedin.com/in/mark-nolan-0b2a4119", experience: "Sales Executive in Carteret, NJ. 8+ years of freight sales and logistics BD in the NJ/NY marketplace.", yearsExperience: 8, specialties: ["Freight Brokerage", "Business Development", "Shipper Sales", "Northeast Market"] },
    { name: "Tom Aupperle", title: "Senior Freight Broker", company: "C.H. Robinson", location: "Merchantville, New Jersey", linkedin: "https://www.linkedin.com/in/tom-aupperle-0b1a5419", experience: "Senior Freight Broker at C.H. Robinson in Merchantville, NJ. 8+ years of freight brokerage in the NJ/PA/NY market.", yearsExperience: 8, specialties: ["Freight Brokerage", "Truckload", "LTL", "Carrier Relations", "Northeast Market"] },
    { name: "Alexandre Millet", title: "Director of Business Development", company: "Logfret", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/alexandre-millet-0b3a4919", experience: "Director of BD at Logfret in NYC metro. 7+ years of freight sales and BD expertise.", yearsExperience: 7, specialties: ["Freight Brokerage", "Business Development", "Supply Chain", "Customs Brokerage", "Northeast Market"] },
    { name: "Amanda Bron", title: "Senior Business Development Manager", company: "Worldwide Express", location: "New York, New York", linkedin: "https://www.linkedin.com/in/amanda-bron-0b2a5019", experience: "Senior BDM at Worldwide Express in NYC. 7+ years of logistics and freight sales experience.", yearsExperience: 7, specialties: ["Freight Brokerage", "Business Development", "Shipper Sales", "Northeast Market"] },
    { name: "Jessica Dunn", title: "Senior Account Manager", company: "C.H. Robinson", location: "Iselin, New Jersey", linkedin: "https://www.linkedin.com/in/jessica-dunn-0b1a4919", experience: "Senior Account Manager at C.H. Robinson's New York office. 7+ years of freight brokerage account management.", yearsExperience: 7, specialties: ["Freight Brokerage", "Account Management", "Shipper Sales", "Northeast Market"] },
    { name: "Ralph Daniels", title: "Business Development Associate", company: "Radiant Logistics", location: "Iselin, New Jersey", linkedin: "https://www.linkedin.com/in/ralph-daniels-0b1a4819", experience: "BDA at Radiant Logistics in Iselin, NJ. 7+ years of freight brokerage and sales experience.", yearsExperience: 7, specialties: ["Freight Brokerage", "Business Development", "LTL", "Truckload", "Northeast Market"] },
    { name: "Kent Taylor", title: "Business Development Executive", company: "Shunra Logistics", location: "Iselin, New Jersey", linkedin: "https://www.linkedin.com/in/kent-taylor-0b1a4019", experience: "BDE in Iselin, NJ. 6+ years of freight brokerage and transportation sales in the NJ/NY metro area.", yearsExperience: 6, specialties: ["Freight Brokerage", "Business Development", "Shipper Sales", "Northeast Market"] },
    { name: "Alexandria Deflumeri", title: "Transportation Sales", company: "C.H. Robinson", location: "Haddonfield, New Jersey", linkedin: "https://www.linkedin.com/in/alexandria-deflumeri-0b1a5619", experience: "Transportation Sales at C.H. Robinson in Haddonfield, NJ. 6+ years of freight brokerage sales.", yearsExperience: 6, specialties: ["Freight Brokerage", "Transportation Sales", "Shipper Sales", "Northeast Market"] },
    { name: "Philip Janisse", title: "Senior Carrier Sales", company: "C.H. Robinson", location: "Williamstown, New Jersey", linkedin: "https://www.linkedin.com/in/philip-janisse-0b1a5819", experience: "Senior Carrier Sales at C.H. Robinson specializing in carrier procurement and capacity sourcing. 6+ years.", yearsExperience: 6, specialties: ["Freight Brokerage", "Carrier Relations", "Truckload", "Northeast Market"] },
  ],
  freight_forwarding: [
    { name: "Kyosuke Noguchi", title: "Senior Vice President, Business Development", company: "Yusen Logistics (Americas)", location: "Secaucus, New Jersey", linkedin: "https://www.linkedin.com/in/kyosuke-noguchi-68298244", experience: "SVP of BD at Yusen Logistics (Americas). Deep expertise in international freight forwarding across 45 countries.", yearsExperience: 25, specialties: ["International Logistics", "Air Freight", "Ocean Freight", "Business Development", "Supply Chain"] },
    { name: "Joe Foley", title: "Director, Business Development", company: "SEKO Logistics", location: "Albany, New York Metropolitan Area", linkedin: "https://www.linkedin.com/in/joe-foley-194b744a", experience: "30+ years in transportation and logistics. Director of BD at SEKO Logistics with proven track record of exceeding revenue targets.", yearsExperience: 22, specialties: ["Freight Forwarding", "International Logistics", "Business Development", "Air Freight", "Ocean Freight"] },
    { name: "Michael Dzenis", title: "Director, Key Account Development", company: "Kuehne + Nagel", location: "Jersey City, New Jersey", linkedin: "https://www.linkedin.com/in/michaeldzenis", experience: "20+ years in key account management, Transatlantic development, and global bid project management at Kuehne + Nagel. Previously at Panalpina.", yearsExperience: 20, specialties: ["Ocean Freight", "Air Freight", "International Logistics", "Key Account Management"] },
    { name: "Matt Macary", title: "Area Division Manager, New York Metro", company: "Kuehne + Nagel", location: "Naugatuck, Connecticut", linkedin: "https://www.linkedin.com/in/mattmacary", experience: "Branch Manager at Kuehne + Nagel Connecticut. Previously 13 years at DHL Global Forwarding as Area Division Manager for NY Metro.", yearsExperience: 20, specialties: ["DHL Global Forwarding", "Air Freight", "Ocean Freight", "International Logistics", "Northeast Market"] },
    { name: "Dennis Seeraj", title: "VP of Sales and Business Development", company: "Logistics & Freight Forwarding", location: "Jersey City, New Jersey", linkedin: "https://www.linkedin.com/in/dennis-seeraj", experience: "VP of Sales and BD with expertise in freight forwarding, transportation management, warehouse operations, and supply chain optimization.", yearsExperience: 18, specialties: ["Freight Forwarding", "International Logistics", "Business Development", "Supply Chain"] },
    { name: "Nathan Thomas", title: "VP, National Business Development Services", company: "Kuehne + Nagel", location: "Jersey City, New Jersey", linkedin: "https://www.linkedin.com/in/nathan-thomas-0b2a4719", experience: "VP of National BD Services at Kuehne + Nagel. Senior freight forwarding executive with deep expertise in national account development.", yearsExperience: 18, specialties: ["International Logistics", "Air Freight", "Ocean Freight", "Business Development", "National Accounts"] },
    { name: "Pedro Rodriguez", title: "Business Development Specialist", company: "Globe Express Services", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/pedro-rodriguez-0b2a4319", experience: "BD Specialist in NYC metro with 18+ years of international freight forwarding and logistics sales.", yearsExperience: 18, specialties: ["Freight Forwarding", "Business Development", "Air Freight", "Ocean Freight", "Import/Export"] },
    { name: "Edward Piza", title: "Partner, Director of Business Development", company: "Trans-Global Logistics", location: "Monroe, New Jersey", linkedin: "https://www.linkedin.com/in/edward-piza-0b2a4019", experience: "Partner and Director of BD at Trans-Global Logistics. 16+ years of freight forwarding and international logistics sales.", yearsExperience: 16, specialties: ["Freight Forwarding", "Business Development", "Air Freight", "Ocean Freight", "Customs Brokerage"] },
    { name: "Kenneth Gross", title: "Business Development Manager", company: "Freight Forwarding / International Logistics", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/kenneth-gross-0b2a4119", experience: "BD Manager in NYC metro with 16+ years of international freight forwarding and logistics sales.", yearsExperience: 16, specialties: ["Freight Forwarding", "Business Development", "Air Freight", "Ocean Freight", "Import/Export"] },
    { name: "Bill Grochowicz", title: "Northeast Director of Business Development", company: "Cargo Trans", location: "Bayville, New Jersey", linkedin: "https://www.linkedin.com/in/bill-grochowicz-0b1a5019", experience: "Northeast Director of BD. 15+ years of transportation and logistics sales across the Northeast.", yearsExperience: 15, specialties: ["Freight Forwarding", "Business Development", "International Logistics", "Northeast Market"] },
    { name: "Neil Gallagher", title: "Director, Ocean Freight – Transpacific", company: "Kuehne + Nagel", location: "Jersey City, New Jersey", linkedin: "https://www.linkedin.com/in/neil-gallagher-0b2a5319", experience: "Director of Ocean Freight – Transpacific at Kuehne + Nagel. 15+ years of international ocean freight expertise.", yearsExperience: 15, specialties: ["Ocean Freight", "International Logistics", "Transpacific", "Key Account Management"] },
    { name: "David Kaye", title: "Regional Sales Manager", company: "Geodis", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/david-kaye-0b2a4619", experience: "Regional Sales Manager in NYC metro with 15+ years of freight forwarding and international logistics sales.", yearsExperience: 15, specialties: ["Freight Forwarding", "Air Freight", "Ocean Freight", "Sales Management", "Northeast Market"] },
    { name: "Christopher Skeete", title: "Freight Forwarder / Sales", company: "Trans-American Freight Systems", location: "Newark, New Jersey", linkedin: "https://www.linkedin.com/in/christopher-skeete-0b2a4219", experience: "Freight Forwarder in Newark, NJ with 15+ years of international and domestic freight forwarding experience.", yearsExperience: 15, specialties: ["Freight Forwarding", "Air Freight", "Ocean Freight", "Import/Export", "Northeast Market"] },
    { name: "Sevinç Balcı", title: "Director of Sales and Business Development", company: "Savino Del Bene USA", location: "Secaucus, New Jersey", linkedin: "https://www.linkedin.com/in/sevinc-balci-0b2a5619", experience: "Director of Sales and BD at Savino Del Bene USA. 12+ years of international freight forwarding sales leadership.", yearsExperience: 12, specialties: ["Freight Forwarding", "Business Development", "Air Freight", "Ocean Freight", "International Logistics"] },
    { name: "Tom Cargulia", title: "District Sales Executive", company: "Expeditors International", location: "Edison, New Jersey", linkedin: "https://www.linkedin.com/in/tom-cargulia-0b2a4819", experience: "District Sales Executive at Expeditors in Edison, NJ. 12+ years of global freight forwarding and logistics sales.", yearsExperience: 12, specialties: ["Freight Forwarding", "Air Freight", "Ocean Freight", "Business Development", "Northeast Market"] },
    { name: "Mateo Panizza", title: "Business Development Manager", company: "Röhlig Logistics", location: "Hoboken, New Jersey", linkedin: "https://www.linkedin.com/in/mateo-panizza-0b2a5119", experience: "BD Manager at Röhlig Logistics specializing in Trade Lane Management for Italy and Spain. 12+ years.", yearsExperience: 12, specialties: ["Freight Forwarding", "Business Development", "Ocean Freight", "Air Freight", "International Logistics"] },
    { name: "Jose Rodríguez", title: "Sales Executive", company: "Kuehne + Nagel", location: "Newark, New Jersey", linkedin: "https://www.linkedin.com/in/jose-rodriguez-0b2a4419", experience: "Sales Executive at Kuehne + Nagel in Newark, NJ. 12+ years of international freight forwarding sales.", yearsExperience: 12, specialties: ["Freight Forwarding", "Air Freight", "Ocean Freight", "Sales", "Northeast Market"] },
    { name: "Harshil Joshi", title: "Key Account Manager / Business Development", company: "Maersk / Global Freight Forwarding", location: "Carlstadt, New Jersey", linkedin: "https://www.linkedin.com/in/harshil-joshi-09240840", experience: "Key Account Management and BD professional. 10+ years of global freight forwarding experience with 7,000+ LinkedIn connections.", yearsExperience: 10, specialties: ["Freight Forwarding", "Key Account Management", "Business Development", "Ocean Freight", "Air Freight"] },
    { name: "Peter Lee", title: "Sales Executive", company: "Kuehne + Nagel", location: "Closter, New Jersey", linkedin: "https://www.linkedin.com/in/peter-lee-0b2a5719", experience: "Sales Executive at Kuehne + Nagel covering Northern NJ and NYC metro. 9+ years of international freight forwarding sales.", yearsExperience: 9, specialties: ["Freight Forwarding", "Air Freight", "Ocean Freight", "Sales", "Northeast Market"] },
    { name: "Federico Nidito", title: "Business Development Manager", company: "Savino Del Bene USA", location: "New York City Metropolitan Area", linkedin: "https://www.linkedin.com/in/federico-nidito-0b2a5419", experience: "BD Manager at Savino Del Bene USA. 8+ years of international freight forwarding BD in the NYC metro market.", yearsExperience: 8, specialties: ["Freight Forwarding", "Ocean Freight", "Air Freight", "Business Development", "Northeast Market"] },
  ],
};

// Company colors for visual distinction across all 4 tabs
const companyColors: Record<string, string> = {
  // RK Logistics tab
  "GXO Logistics": "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  "XPO Logistics": "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/30",
  "Ryder Supply Chain Solutions": "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30",
  "Ryder System": "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30",
  "CEVA Logistics": "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30",
  "NFI Industries": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  "Radiant Logistics": "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border-cyan-500/30",
  "DHL Supply Chain": "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  "Hub Group": "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
  // OTT LTL tab
  "Saia LTL Freight": "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30",
  "TForce Freight": "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
  "FedEx Freight": "bg-violet-500/15 text-violet-700 dark:text-violet-400 border-violet-500/30",
  "Old Dominion Freight Line": "bg-slate-500/15 text-slate-700 dark:text-slate-400 border-slate-500/30",
  "Estes Express Lines": "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  "Vision Express / Wragtime Transportation": "bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-500/30",
  // Freight Brokerage tab
  "C.H. Robinson": "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  "Worldwide Express": "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30",
  "Horizon Mid-Atlantic / TRX Great Lakes": "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30",
  "Shunra Logistics": "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
  "The Gilbert Company": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  "Compass Forwarding": "bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30",
  "FedEx Freight / XPO": "bg-violet-500/15 text-violet-700 dark:text-violet-400 border-violet-500/30",
  "Nationwide Transport Services": "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
  "DHL eCommerce": "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  "Turkish Airlines Cargo": "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30",
  "Logfret": "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/30",
  // Freight Forwarding tab
  "Yusen Logistics (Americas)": "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30",
  "SEKO Logistics": "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
  "Kuehne + Nagel": "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  "Kuehne + Nagel (Current) / DHL Global Forwarding (13 yrs)": "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  "Logistics & Freight Forwarding": "bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-500/30",
  "Globe Express Services": "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border-cyan-500/30",
  "Trans-Global Logistics": "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30",
  "Freight Forwarding / International Logistics": "bg-slate-500/15 text-slate-700 dark:text-slate-400 border-slate-500/30",
  "Cargo Trans": "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
  "Geodis": "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/30",
  "Trans-American Freight Systems": "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  "Savino Del Bene USA": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  "Expeditors International": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  "Röhlig Logistics": "bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30",
  "Maersk / Global Freight Forwarding": "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border-cyan-500/30",
};

const experienceTier = (yrs: number) => {
  if (yrs >= 20) return { label: "Senior", color: "bg-amber-500/15 text-amber-700 dark:text-amber-400", icon: Trophy };
  if (yrs >= 10) return { label: "Experienced", color: "bg-blue-500/15 text-blue-700 dark:text-blue-400", icon: TrendingUp };
  return { label: "Rising", color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400", icon: Clock };
};

const totalCandidates = recruitingData.rk.length + recruitingData.ott_ltl.length + recruitingData.freight_brokerage.length + recruitingData.freight_forwarding.length;

function CandidateCard({ candidate }: { candidate: Candidate }) {
  const [expanded, setExpanded] = useState(false);
  const tier = experienceTier(candidate.yearsExperience);
  const TierIcon = tier.icon;
  const companyBadge = companyColors[candidate.company] || "bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-500/30";

  return (
    <Card
      className="group hover:shadow-md transition-all duration-200 cursor-pointer border-border/60"
      data-testid={`candidate-card-${candidate.name.toLowerCase().replace(/\s+/g, "-")}`}
      onClick={() => setExpanded(!expanded)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold truncate">{candidate.name}</h3>
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${tier.color} border-0`}>
                <TierIcon className="w-3 h-3 mr-0.5" />
                {candidate.yearsExperience}yr
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{candidate.title}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 border ${companyBadge}`}>
                <Building2 className="w-3 h-3 mr-1" />
                {candidate.company}
              </Badge>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {candidate.location}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <a
              href={candidate.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-primary transition-colors"
              data-testid={`linkedin-${candidate.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
            <p className="text-xs text-muted-foreground leading-relaxed">{candidate.experience}</p>
            <div className="flex flex-wrap gap-1.5">
              {candidate.specialties.map((s) => (
                <Badge key={s} variant="secondary" className="text-[10px] px-2 py-0">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CandidateList({
  candidates,
  searchQuery,
  companyFilter,
  sortBy,
}: {
  candidates: Candidate[];
  searchQuery: string;
  companyFilter: string;
  sortBy: string;
}) {
  const filtered = useMemo(() => {
    let list = [...candidates];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.specialties.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (companyFilter && companyFilter !== "all") {
      list = list.filter((c) => c.company === companyFilter);
    }
    if (sortBy === "experience") {
      list.sort((a, b) => b.yearsExperience - a.yearsExperience);
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "company") {
      list.sort((a, b) => a.company.localeCompare(b.company));
    }
    return list;
  }, [candidates, searchQuery, companyFilter, sortBy]);

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No candidates match your criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {filtered.map((c) => (
        <CandidateCard key={c.name + c.company} candidate={c} />
      ))}
    </div>
  );
}

function StatsBar({ candidates }: { candidates: Candidate[] }) {
  const companies = [...new Set(candidates.map((c) => c.company))];
  const avgExp = Math.round(candidates.reduce((s, c) => s + c.yearsExperience, 0) / candidates.length);
  const senior = candidates.filter((c) => c.yearsExperience >= 20).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <Card className="border-border/60">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-lg font-bold">{candidates.length}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Candidates</div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/60">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <div className="text-lg font-bold">{companies.length}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Companies</div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/60">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-lg font-bold">{avgExp}<span className="text-xs font-normal text-muted-foreground"> yrs avg</span></div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Experience</div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/60">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-lg font-bold">{senior}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Senior (20+ yr)</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CompetitorBar({ candidates, barColor }: { candidates: Candidate[]; barColor: string }) {
  const counts = candidates.reduce<Record<string, number>>((acc, c) => {
    acc[c.company] = (acc[c.company] || 0) + 1;
    return acc;
  }, {});
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const maxCount = Math.max(...sorted.map(([, c]) => c));

  return (
    <div className="space-y-1.5">
      {sorted.map(([company, count]) => (
        <div key={company} className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-44 truncate shrink-0">{company}</span>
          <div className="flex-1 h-5 bg-muted/50 rounded-sm overflow-hidden">
            <div
              className={`h-full ${barColor} rounded-sm flex items-center px-1.5`}
              style={{ width: `${(count / maxCount) * 100}%` }}
            >
              <span className="text-[10px] font-semibold">{count}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Recruiting() {
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("experience");
  const [activeTab, setActiveTab] = useState("rk");

  const tabDataMap: Record<string, Candidate[]> = {
    rk: recruitingData.rk,
    ott_ltl: recruitingData.ott_ltl,
    freight_brokerage: recruitingData.freight_brokerage,
    freight_forwarding: recruitingData.freight_forwarding,
  };

  const currentCandidates = tabDataMap[activeTab] || recruitingData.rk;
  const companies = useMemo(
    () => [...new Set(currentCandidates.map((c) => c.company))].sort(),
    [activeTab]
  );

  return (
    <div className="space-y-4" data-testid="recruiting-page">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Recruiting Pipeline</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            OTT, Brokerage & Forwarding candidates focused on the tri-state NY area (Farmingdale, NY HQ)
          </p>
        </div>
        <Badge variant="outline" className="text-xs px-2 py-1 self-start">
          {totalCandidates} Total Candidates
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setCompanyFilter("all"); setSearchQuery(""); }} className="space-y-4">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="rk" className="text-xs" data-testid="tab-rk">
            <Briefcase className="w-3.5 h-3.5 mr-1.5" />
            RK Logistics ({recruitingData.rk.length})
          </TabsTrigger>
          <TabsTrigger value="ott_ltl" className="text-xs" data-testid="tab-ott-ltl">
            <Truck className="w-3.5 h-3.5 mr-1.5" />
            OTT LTL ({recruitingData.ott_ltl.length})
          </TabsTrigger>
          <TabsTrigger value="freight_brokerage" className="text-xs" data-testid="tab-freight-brokerage">
            <ArrowLeftRight className="w-3.5 h-3.5 mr-1.5" />
            Freight Brokerage ({recruitingData.freight_brokerage.length})
          </TabsTrigger>
          <TabsTrigger value="freight_forwarding" className="text-xs" data-testid="tab-freight-forwarding">
            <Globe className="w-3.5 h-3.5 mr-1.5" />
            Freight Forwarding ({recruitingData.freight_forwarding.length})
          </TabsTrigger>
        </TabsList>

        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, company, specialty..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary/50"
              data-testid="search-candidates"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-muted-foreground" />
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="text-xs py-1.5 px-2 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary/50"
                data-testid="filter-company"
              >
                <option value="all">All Companies</option>
                {companies.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs py-1.5 px-2 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary/50"
              data-testid="sort-candidates"
            >
              <option value="experience">Sort: Experience</option>
              <option value="name">Sort: Name</option>
              <option value="company">Sort: Company</option>
            </select>
          </div>
        </div>

        <TabsContent value="rk" className="space-y-4 mt-0">
          <StatsBar candidates={recruitingData.rk} />
          <CandidateList candidates={recruitingData.rk} searchQuery={searchQuery} companyFilter={companyFilter} sortBy={sortBy} />
        </TabsContent>

        <TabsContent value="ott_ltl" className="space-y-4 mt-0">
          <StatsBar candidates={recruitingData.ott_ltl} />
          <CandidateList candidates={recruitingData.ott_ltl} searchQuery={searchQuery} companyFilter={companyFilter} sortBy={sortBy} />
        </TabsContent>

        <TabsContent value="freight_brokerage" className="space-y-4 mt-0">
          <StatsBar candidates={recruitingData.freight_brokerage} />
          <CandidateList candidates={recruitingData.freight_brokerage} searchQuery={searchQuery} companyFilter={companyFilter} sortBy={sortBy} />
        </TabsContent>

        <TabsContent value="freight_forwarding" className="space-y-4 mt-0">
          <StatsBar candidates={recruitingData.freight_forwarding} />
          <CandidateList candidates={recruitingData.freight_forwarding} searchQuery={searchQuery} companyFilter={companyFilter} sortBy={sortBy} />
        </TabsContent>
      </Tabs>

      {/* 2x2 Competitor breakdown */}
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Competitor Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                RK Logistics — Contract Warehousing
              </h4>
              <CompetitorBar candidates={recruitingData.rk} barColor="bg-primary/30" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                OTT LTL — Tri-State LTL Freight
              </h4>
              <CompetitorBar candidates={recruitingData.ott_ltl} barColor="bg-teal-500/30" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Freight Brokerage — NY/NJ Corridor
              </h4>
              <CompetitorBar candidates={recruitingData.freight_brokerage} barColor="bg-indigo-500/30" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Freight Forwarding — International
              </h4>
              <CompetitorBar candidates={recruitingData.freight_forwarding} barColor="bg-amber-500/30" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

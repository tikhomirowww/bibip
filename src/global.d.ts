type Trip = {
  Id: string;
  RouterId: string;
  ScheduleTripId: string;
  RouterName: string;
  RouterNum: string | null;
  Carrier: string;
  Bus: Bus;
  Driver1: null | string;
  Driver2: null | string;
  Frequency: string;
  WaybillNum: null | string;
  Status: string;
  StatusPrint: string;
  StatusReason: null | string;
  StatusComment: null | string;
  StatusDate: null | string;
  Departure: Location;
  DepartureTime: string;
  ArrivalToDepartureTime: string;
  Destination: Location;
  ArrivalTime: string;
  Distance: string;
  Duration: string;
  TransitSeats: boolean;
  FreeSeatsAmount: number;
  PassengerFareCost: string;
  Fares: [];
  Platform: number;
  OnSale: boolean;
  Route: [];
  Additional: boolean;
  AdditionalTripTime: [];
  TransitTrip: null;
  SaleStatus: null;
  ACBPDP: null;
  FactTripReturnTime: null;
  Currency: Currency;
  PrincipalTaxId: string;
  CarrierData: CarrierData;
};

type Bus = {
  Id: string;
  Model: string;
  LicencePlate: string;
  Name: string;
  SeatsClass: string;
  SeatCapacity: number;
  StandCapacity: number;
  BaggageCapacity: number;
  SeatsScheme: [];
  GarageScheme: null;
};

enum Currency {
  RUB = "RUB",
}

interface Location {
  Name: string;
  Code: string;
  Id: string;
  Country: string;
  Region: string;
  District: null | string;
  Automated: boolean;
  HasDestinations: boolean;
  UTC: string;
  GPSCoordinates: string;
  LocationType: string;
  Locality: null | string;
  StoppingPlace: null | string;
  Address: string;
  Phone: null | string;
}

type CarrierData = {
  CarrierName: string;
  CarrierTaxId: string;
  CarrierStateRegNum: string;
  CarrierPersonalData: CarrierPersonalData[];
  CarrierAddress: string;
  CarrierWorkingHours: string;
};

type CarrierPersonalData = {
  Name: string;
  Caption: string;
  Mandatory: boolean;
  PersonalIdentifier: boolean;
  Type: string;
  ValueVariants: [];
  InputMask: null;
  Value: string;
  ValueKind: null;
  DefaultValueVariant: DefaultValueVariant;
  DocumentIssueDateRequired: null | string;
  DocumentIssueOrgRequired: null | string;
  DocumentValidityDateRequired: null | string;
  DocumentInceptionDateRequired: null | string;
  DocumentIssuePlaceRequired: null | string;
  Value1: null | string;
  Value2: null | string;
  Value3: null | string;
  Value4: null | string;
  Value5: null | string;
};

type DefaultValueVariant = {
  Name: null | string;
  InputMask: null | string;
  ValueProperty1: null | string;
  ValueProperty2: null | string;
  ValueProperty3: null | string;
  ValueProperty4: null | string;
  ValueProperty5: null | string;
};
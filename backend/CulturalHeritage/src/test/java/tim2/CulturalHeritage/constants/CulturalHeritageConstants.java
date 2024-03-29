package tim2.CulturalHeritage.constants;

import tim2.CulturalHeritage.model.CHSubtype;
import tim2.CulturalHeritage.model.Location;

public class CulturalHeritageConstants {
  public static final String NAME = "Muzej Nikole Tesle";
  public static final String DESCRIPTION = "Najlepsi muzej u Srbiji";
  public static final Long  LOCATION_ID = 1L;
  public static final Long  CH_SUBTYPE_ID = 1L;
  public static final Long CH_ID = 1L;
  public static final Long CH_ID_VALID = 2L;
  public static final Long CH_ID_NOT_FOUND = 100L;
  public static final int PAGE_SIZE = 5;
  public static final Long UNSUBSCRIBE_ID = 1L;

  public static final int NUMBER_OF_CH_IN_DB = 3;

  public static final double AVG_RATING_CH_ID_1 = 3.5;


  public static final Location LOCATION = new Location(LOCATION_ID, null, null, null, null, null);
  public static final CHSubtype CH_SUBTYPE = new CHSubtype(CH_SUBTYPE_ID, null, null);

  public static final String FILTER_NAME = "CH";
  public static final int FILTER_NAME_RESULTS = 2;

  public static final String FILTER_CITY = "Novi Sad";
  public static final int FILTER_CITY_RESULTS = 1;

  public static final String FILTER_SUBTYPE = "festival";
  public static final int FILTER_SUBTYPE_RESULTS = 2;

  public static final String FILTER_COUNTRY = "Kentucky, USA";
  public static final int FILTER_COUNTRY_RESULTS = 2;

  public static final String FILTER_INVALID = "sdsddsdsdsd";

  public static final long CH_ID_DELETE_SHOULD = 2l;
}

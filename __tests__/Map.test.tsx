import { render } from "@testing-library/react-native";
import Map from "../src/components/bottom-tab-components/Map";

export const heightPercentageToDP = jest.fn(percentage => percentage);
export const widthPercentageToDP = jest.fn(percentage => percentage);
jest.mock("react-native-responsive-screen", () => ({
    heightPercentageToDP: jest.fn(),
    widthPercentageToDP: jest.fn()
  }))
  jest.mock('react-native-maps', () => {
    const {View} = require('react-native');
    const MockMapView = (props: any) => <View {...props} />;
    const MockMarker = (props: any) => <View {...props} />;
    const PROVIDER_DEFAULT = 'mocked-provider-default';
    return {
      __esModule: true,
      default: MockMapView,
      Marker: MockMarker,
      PROVIDER_DEFAULT: PROVIDER_DEFAULT,
    };
  });

    test("render component",()=>{
            const {getByTestId}=render(<Map/>)
            const mapview=getByTestId('mapview');
            mapview.props.onRegionChange()
        expect(mapview).toBeDefined()
    })




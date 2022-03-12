import Icon from '../components/blocks/Icon';
import Title from '../components/blocks/Title';
import Text from '../components/blocks/Text';
import List from '../components/blocks/List';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlockTypes: {[key: string]: any} = {
  // -=- Page Components -=-
  'page-icon': Icon,
  'page-title': Title,

  // -=- Text Based Components -=-
  text: Text,
  h1: Text,
  h2: Text,
  h3: Text,
  h4: Text,
  h5: Text,

  // -=- Semi-Text Based Components -=-
  quote: Text,
  callout: Text,

  // -=- List Based Components -=-
  'o-list': List,
  'u-list': List,
};

export default BlockTypes;

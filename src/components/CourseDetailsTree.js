import { TreeItem, TreeView } from '@material-ui/lab';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function CourseDetailsTree({ data, handleListItemClick }) {
	return (
		<TreeView
			aria-label='file system navigator'
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
			{data &&
				data.map((data) => (
					<TreeItem key={data._id} nodeId={data._id} label={data.title}>
						{data.lessons &&
							data.lessons.map((data) => (
								<TreeItem
									key={data._id}
									nodeId={data._id}
									label={data.title}
									onClick={() => {
										handleListItemClick(data.link);
									}}
								/>
							))}
					</TreeItem>
				))}
		</TreeView>
	);
}

// const TreeNode = ({ data }) => {
//   return (
//     <TreeItem label={data.title} nodeId={data._id}>
//       {data?.lessons.map((data) => (
//         <TreeItem label={data.title} nodeId={data._id}></TreeItem>
//       ))}
//     </TreeItem>
//   );
// };

export default CourseDetailsTree;

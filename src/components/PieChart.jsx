import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
// import { mockPieData as data, mockPieData } from "../data/mockData";
import { useEffect, useState } from "react";
import UserService from "../service/UserService";
import { token } from "../service";

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([
    {
      id: "numberOfPlayer",
      label: "Người chơi",
      value: 0,
      color: "#F37148",
    },
    {
      id: "numberOfOwner",
      label: "Chủ sân",
      value: 0,
      color: "#299083",
    },
  ]);

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const res = await UserService.getNumberOfPlayerAndOwner(token);

      if (res) {
        setData([
          {
            id: "Người chơi",
            label: "Người chơi",
            value: res.numberOfPlayer,
            color: "#F37148",
          },
          {
            id: "Chủ sân",
            label: "Chủ sân",
            value: res.numberOfOwner,
            color: "#299083",
          },
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    // <ResponsivePie
    //   data={mockPieData}
    //   defs={defs} // Pass the defs array here
    //   fill={fill} // Pass the fill array here
    //   theme={{
    //     axis: {
    //       domain: {
    //         line: {
    //           stroke: colors.grey[100],
    //         },
    //       },
    //       legend: {
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //       ticks: {
    //         line: {
    //           stroke: colors.grey[100],
    //           strokeWidth: 1,
    //         },
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //     },
    //     legends: {
    //       text: {
    //         fill: colors.grey[100],
    //       },
    //     },
    //   }}
    //   margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    //   innerRadius={0.5}
    //   padAngle={0.7}
    //   cornerRadius={3}
    //   activeOuterRadiusOffset={8}
    //   borderColor={{
    //     from: "color",
    //     modifiers: [["darker", 0.2]],
    //   }}
    //   arcLinkLabelsSkipAngle={10}
    //   arcLinkLabelsTextColor={colors.grey[100]}
    //   arcLinkLabelsThickness={2}
    //   arcLinkLabelsColor={{ from: "color" }}
    //   enableArcLabels={false}
    //   arcLabelsRadiusOffset={0.4}
    //   arcLabelsSkipAngle={7}
    //   arcLabelsTextColor={{
    //     from: "color",
    //     modifiers: [["darker", 2]],
    //   }}
    //   legends={[
    //     {
    //       anchor: "bottom",
    //       direction: "row",
    //       justify: false,
    //       translateX: 0,
    //       translateY: 56,
    //       itemsSpacing: 0,
    //       itemWidth: 100,
    //       itemHeight: 18,
    //       itemTextColor: "#999",
    //       itemDirection: "left-to-right",
    //       itemOpacity: 1,
    //       symbolSize: 18,
    //       symbolShape: "circle",
    //       effects: [
    //         {
    //           on: "hover",
    //           style: {
    //             itemTextColor: "#000",
    //           },
    //         },
    //       ],
    //     },
    //   ]}
    // />

    <ResponsivePie
      data={data}
      theme={[
        ("tooltip": {
          wrapper: {},
          container: {
            background: "#ffffff",
            color: "#333333",
            fontSize: 13,
          },
          basic: {},
          chip: {},
          table: {},
          tableCell: {},
          tableCellValue: {},
        }),
      ]}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#F37148"
      arcLinkLabelsThickness={5}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "Người chơi",
          },
          id: "dots",
        },

        {
          match: {
            id: "Chủ sân",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;

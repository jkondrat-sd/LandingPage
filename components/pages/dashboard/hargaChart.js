import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Typography } from '@mui/material';
import { formatCurrencyRp, formatDateId } from '@/utils/common';
import Image from 'next/image';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import useMediaQuery from "@/hooks/useMediaQuery";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  annotationPlugin
);

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#rgba(33, 47, 86, 0.9)',
    color: '#ffffff',
    fontSize: theme.typography.pxToRem(10),
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#rgba(33, 47, 86, 0.9)',
  },
}));

export default function HargaChart({ chartData, meta, summariesData, cityOrDistrict, params }) {
  const { isMobile, isTablet, isDesktop } = useMediaQuery();
  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  const labels = chartData.map((item) => item.city_name);
  const dataLebel = chartData.map((item) => item.price);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: function (params) {
            return params[0]?.label;
          },
          label: function (params) {
            return formatCurrencyRp(params?.raw);
          }
        }
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Harga per Kg (Rupiah)',
        position: 'left',
        color: '#008444',
        font: {
          family: 'Lato',
          size: mobileTab ? '14px' : '20px',
          weight: 'normal'
        }
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: summariesData?.average_province_price,
            yMax: summariesData?.average_province_price,
            borderColor: '#FFB900',
            borderWidth: 5,
          }
        },
      },
    },
    scales: {
      x: {
        grid: {
          tickColor: '#008444',
          borderColor: '#008444',
          color: 'transparent',
        },
        ticks: {
          color: '#008444',
        }
      },
      y: {
        grid: {
          tickColor: '#008444',
          borderColor: '#008444',
          color: 'transparent',
        },
        ticks: {
          color: '#008444',
        }
      }
    },
    layout: {
      padding: '20px'
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Neraca Pangan',
        data: dataLebel,
        borderColor: '#FFB900',
        backgroundColor: dataLebel.map((val) => val < summariesData?.average_province_price ? '#008444' : '#F44336'),
      },
    ],
  };
  return (
    <div style={{maxHeight: mobileTab ? '300px' : '400px', padding: mobileTab ? '0' : '50px', width: '100%', marginBottom: '50px'}}>
      <div className='w-full text-right mb-5'>
        
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography sx={{fontWeight: 'bold'}}>Belum Input Data</Typography>
              {
                Array.isArray(cityOrDistrict.not_updated) && cityOrDistrict.not_updated.map((item) => (
                  <Typography key={item}>{item}</Typography>
                ))
              }
            </React.Fragment>
          }
        >
          <div style={{width: '32px', height: '32px', position: 'relative', cursor: 'pointer', marginLeft: 'auto'}}>
            <Image src="/icons/not_updated_icon.svg" layout="fill" alt="icon" />
          </div>
        </HtmlTooltip>
      </div>

      <Bar options={options} data={data} />
      <div className='w-full text-center'>
        <Typography style={{fontFamily: 'Lato', fontSize: mobileTab ? '14px' : '20px', color: '#008444'}}>Daerah</Typography>
      </div>
      <div>
        <Typography className="font-lato" sx={{fontSize: '0.8em', color: '#404040'}}>
          Sumber Data: {meta.source_data}
        </Typography>
        <Typography className="font-lato" sx={{fontSize: '0.8em', color: '#404040'}}>
          Update Terakhir: {formatDateId(params.date)}
        </Typography>
      </div>
    </div>
  );
}
